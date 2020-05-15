/* eslint-disable no-use-before-define */
// @ts-check

import harden from '@agoric/harden';
import produceIssuer from '@agoric/ertp';
import {
  makeZoeHelpers,
  defaultAcceptanceMsg,
} from '@agoric/zoe/src/contractSupport/zoeHelpers';

export const makeContract = harden(zcf => {
  // Create the internal Plant mint
  const { issuer, mint, amountMath: plantAmountMath } = produceIssuer(
    'Bonsai',
    'set',
  );

  const {
    // generate assets
    terms: { name, price, count, expectedAmountPerPlant },
    issuerKeywordRecord: { Money: moneyIssuer },
  } = zcf.getInstanceRecord();

  const { amountMath: moneyAmountMath } = zcf.getIssuerRecord(moneyIssuer);

  const { rejectOffer, checkHook, escrowAndAllocateTo } = makeZoeHelpers(zcf);

  let auditoriumOfferHandle;

  return zcf.addNewIssuer(issuer, 'Plant').then(() => {
    const plantAmount = plantAmountMath.make(
      harden(
        Array(count)
          .fill()
          .map((_, i) => {
            const plantNumber = i + 1;
            return harden({
              name: name[i],
              plantId: plantNumber,
              price,
            });
          }),
      ),
    );
    const plantPayment = mint.mintPayment(plantAmount);

    const auditoriumOfferHook = offerHandle => {
      auditoriumOfferHandle = offerHandle;
      return escrowAndAllocateTo({
        amount: plantAmount,
        payment: plantPayment,
        keyword: 'Plant',
        recipientHandle: auditoriumOfferHandle,
      }).then(() => defaultAcceptanceMsg);
    };

    const buyPlantOfferHook = buyerOfferHandle => {
      const buyerOffer = zcf.getOffer(buyerOfferHandle);

      const currentAuditoriumAllocation = zcf.getCurrentAllocation(
        auditoriumOfferHandle,
      );
      const currentBuyerAllocation = zcf.getCurrentAllocation(buyerOfferHandle);

      const wantedPlantsCount = buyerOffer.proposal.want.Plant.extent.length;
      const wantedMoney = expectedAmountPerPlant.extent * wantedPlantsCount;

      try {
        if (
          !moneyAmountMath.isGTE(
            currentBuyerAllocation.Money,
            moneyAmountMath.make(wantedMoney),
          )
        ) {
          throw new Error(
            'The offer associated with this seat does not contain enough moolas',
          );
        }

        const wantedAuditoriumAllocation = {
          Money: moneyAmountMath.add(
            currentAuditoriumAllocation.Money,
            currentBuyerAllocation.Money,
          ),
          Plant: plantAmountMath.subtract(
            currentAuditoriumAllocation.Plant,
            buyerOffer.proposal.want.Plant,
          ),
        };

        const wantedBuyerAllocation = {
          Money: moneyAmountMath.getEmpty(),
          Plant: plantAmountMath.add(
            currentBuyerAllocation.Plant,
            buyerOffer.proposal.want.Plant,
          ),
        };

        zcf.reallocate(
          [auditoriumOfferHandle, buyerOfferHandle],
          [wantedAuditoriumAllocation, wantedBuyerAllocation],
        );
        zcf.complete([buyerOfferHandle]);
      } catch (err) {
        // amounts don't match or reallocate certainly failed
        rejectOffer(buyerOfferHandle);
      }
    };

    const buyPlantExpected = harden({
      want: { Plant: null },
      give: { Money: null },
    });

    return harden({
      invite: zcf.makeInvitation(auditoriumOfferHook, 'auditorium'),
      publicAPI: {
        makeBuyerInvite: () =>
          zcf.makeInvitation(
            checkHook(buyPlantOfferHook, buyPlantExpected),
            'buy plant',
          ),
        getPlantIssuer: () => issuer,
        getAvailablePlants() {
          // Because of a technical limitation in @agoric/marshal, an array of extents
          // is better than a Map https://github.com/Agoric/agoric-sdk/issues/838
          return zcf.getCurrentAllocation(auditoriumOfferHandle).Plant.extent;
        },
      },
    });
  });
});
