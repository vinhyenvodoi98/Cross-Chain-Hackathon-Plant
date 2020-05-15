import fs from 'fs';
import installationConstants from '../ui/src/conf/installationConstants.js';
import {E} from '@agoric/eventual-send';
import harden from '@agoric/harden';
import {makeGetInstanceHandle} from '@agoric/zoe/src/clientSupport';
import makeAmountMath from '@agoric/ertp/src/amountMath';


export default async function deployApi(referencesPromise, {bundleSource, pathResolve}) {

    // Let's wait for the promise to resolve.
    const references = await referencesPromise;

    // Unpack the references.
    const {
        wallet,
        uploads: scratch,
        spawner,
        zoe,
        registry,
        http,
    } = references;

    const {
      INSTALLATION_REG_KEY,
      CONTRACT_NAME
    } = installationConstants;

    const movieContractInstallationHandle = await E(registry).get(INSTALLATION_REG_KEY);

    const issuersArray = await E(wallet).getIssuers();
    const issuers = new Map(issuersArray);
    const moolaIssuer = issuers.get('moola');

    const getLocalAmountMath = issuer =>
        Promise.all([
            E(issuer).getBrand(),
            E(issuer).getMathHelpersName(),
        ]).then(([brand, mathHelpersName]) => makeAmountMath(brand, mathHelpersName));

    const moolaAmountMath = await getLocalAmountMath(moolaIssuer);
    const expectedAmount = moolaAmountMath.make(22)
    console.log(expectedAmount)

    const issuerKeywordRecords = harden({Money: moolaIssuer});
    const adminInvite = await E(zoe).makeInstance(movieContractInstallationHandle, issuerKeywordRecords, {
        name: 'Lotus',
        count: 10,
        price: 20,
        expectedAmount,
    });
    console.log('- SUCCESS! contract instance is running on Zoe');

    const inviteIssuer = await E(zoe).getInviteIssuer();
    const getInstanceHandle = makeGetInstanceHandle(inviteIssuer);
    const instanceHandle = await getInstanceHandle(adminInvite);
    const {publicAPI, terms} = await E(zoe).getInstanceRecord(instanceHandle)
    const invite = await E(publicAPI).makeBuyerInvite()
    const buyerInvite = await E(inviteIssuer).claim(invite)

    console.log(await E(inviteIssuer).isLive(buyerInvite))

    const {
        payout: adminPayoutP,
        outcome: adminOutcomeP,
        cancelObj,
    } = await E(zoe).offer(adminInvite);

    const outcome = await adminOutcomeP;
    console.log(`-- ${outcome}`);

    const INSTANCE_REG_KEY = await E(registry).register(`${CONTRACT_NAME}instance`, instanceHandle);

    console.log(`-- Contract Name: ${CONTRACT_NAME}`);
    console.log(`-- InstanceHandle Register Key: ${INSTANCE_REG_KEY}`);

    const {source, moduleFormat} = await bundleSource(pathResolve('./src/handler.js'));

    // Install it on the spawner
    const handlerInstall = E(spawner).install(source, moduleFormat);

    // Spawn the running code
    const brandPs = [];
    const keywords = [];
    Object.entries(issuerKeywordRecords).map(async ([keyword, issuer]) => {
        keywords.push(keyword);
        brandPs.push(E(issuer).getBrand());
    });

    const handler = E(handlerInstall).spawn({registry, brandPs, keywords, publicAPI});

    await E(http).registerAPIHandler(handler);


    // Re-save the constants somewhere where the UI and api can find it.
    const dappConstants = {
        INSTANCE_REG_KEY,
        // BRIDGE_URL: 'agoric-lookup:https://local.agoric.com?append=/bridge',
        BRIDGE_URL: 'http://127.0.0.1:8000',
        API_URL: 'http://127.0.0.1:8000',
    };
    const defaultsFile = pathResolve(`../ui/src/conf/defaults.js`);
    console.log('writing', defaultsFile);
    const defaultsContents = `\
  // GENERATED FROM ${pathResolve('./deploy.js')}
  export default ${JSON.stringify(dappConstants, undefined, 2)};
  `;
    await fs.promises.writeFile(defaultsFile, defaultsContents);
}