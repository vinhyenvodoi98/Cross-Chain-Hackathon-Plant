import dappConstants from './src/conf/defaults.js';
import { E } from '@agoric/eventual-send';

const PLANT_ISSUER_PETNAME = 'bonsai';
const PLANT_PURSE_PETNAME = 'Garden';

// The contract's registry key for the assurance issuer.
const {
  issuerRegKeys: { Plant: PLANT_ISSUER_REGKEY },
  brandRegKeys: { Plant: PLANT_BRAND_REGKEY },
} = dappConstants;

export default async function deployWallet(referencesPromise, { bundleSource, pathResolve }) {
  // Let's wait for the promise to resolve.
  const references = await referencesPromise;
  const { wallet, registry } = references;

  // Install this Dapp's issuer and empty purse in the wallet.
  const plantIssuer = await E(registry).get(PLANT_ISSUER_REGKEY);
  console.log('plantIssuer', plantIssuer);

  if (!plantIssuer) {
    throw Error(`The ${PLANT_ISSUER_REGKEY} registry key was not found; first:
agoric deploy contract/deploy.js api/deploy.js`);
  }

  // Associate the issuer with a petname.
  await E(wallet).addIssuer(PLANT_ISSUER_PETNAME, plantIssuer, PLANT_BRAND_REGKEY);

  // Create an empty purse for that issuer, and give it a petname.
  await E(wallet).makeEmptyPurse(PLANT_ISSUER_PETNAME, PLANT_PURSE_PETNAME);

  // We are done!
  console.log('INSTALLED in local wallet');
  console.log(`bonsai issuer:`, PLANT_ISSUER_PETNAME);
  console.log(`bonsai purse:`, PLANT_PURSE_PETNAME);
}
