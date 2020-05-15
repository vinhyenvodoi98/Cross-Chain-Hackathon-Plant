import { doFetch } from 'utils/fetch-websocket';

export const SERVER_CONNECTED = 'SERVER_CONNECTED';
export const serverConnected = (connected) => async (dispatch) => {
  dispatch({
    type: SERVER_CONNECTED,
    connected
  });
};

export const ACTIVATE_CONNECTION = 'ACTIVATE_CONNECTION';
export const activateConnection = (active) => async (dispatch) => {
  dispatch({
    type: ACTIVATE_CONNECTION,
    active
  });
};

export const UPDATE_PURSES = 'UPDATE_PURSES';
export const updatePurses = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PURSES,
    purses: data
  });
};

///// Message handler

export const messageHandler = (message) => async (dispatch) => {
  if (!message) return;
  const { type, data } = message;
  if (type === 'walletUpdatePurses') {
    //update Pureses
    dispatch(updatePurses(JSON.parse(data)));
  } else if (type === 'walletOfferDescriptions') {
    // TODO what is walletOfferDescriptions do ?
    console.log(data);
    // dispatch(updateOffers(data));
  }
};

export const apiMessageHandler = (message) => async (dispatch) => {
  if (!message) return;
  console.log('message', message);
  // const { type, data } = message;
  // if (type === 'walletUpdatePurses') {
  //update Pureses
  //   dispatch(updatePurses(JSON.parse(data)));
  // } else if (type === 'walletOfferDescriptions') {
  // TODO what is walletOfferDescriptions do ?
  // console.log(data);
  // dispatch(updateOffers(data));
  // }
};

//// Create Offer
export const createOffer = (number, pursePetname) => async (dispatch, getState) => {
  const state = getState();
  console.log(state);
  const now = Date.now();
  const offer = {
    // JSONable ID for this offer.  This is scoped to the origin.
    id: now,

    // Contract-specific metadata.
    instanceRegKey: state.instanceId,

    // Format is:
    //   hooks[targetName][hookName] = [hookMethod, ...hookArgs].
    // Then is called within the wallet as:
    //   E(target)[hookMethod](...hookArgs)
    hooks: {
      publicAPI: {
        getInvite: ['makeInvite'] // E(publicAPI).makeInvite()
      }
    },

    proposalTemplate: {
      give: {
        Tip: {
          // The pursePetname identifies which purse we want to use
          pursePetname: pursePetname,
          extent: Number(number)
        }
      },
      exit: { onDemand: null }
    }
  };
  console.log('wallet > ', offer);
  doFetch({
    type: 'walletAddOffer',
    data: offer
  });
};
