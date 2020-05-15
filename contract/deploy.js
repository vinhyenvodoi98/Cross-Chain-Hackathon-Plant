// @ts-check
import fs from 'fs';
import { E } from '@agoric/eventual-send';

/**
 * @typedef {Object} DeployPowers The special powers that agoric deploy gives us
 * @property {(path: string) => { moduleFormat: string, source: string }} bundleSource
 * @property {(path: string) => string} pathResolve
 */

/**
 *
 * @param {*} referencesPromise
 * @param {DeployPowers} powers
 */
export default async function deployContract(
  referencesPromise,
  { bundleSource, pathResolve },
) {
  // Let's wait for the promise to resolve.
  const references = await referencesPromise;

  // Unpack the references.
  const {
    // *** ON-CHAIN REFERENCES ***

    zoe,

    registry,
  } = references;

  const { source, moduleFormat } = await bundleSource(
    pathResolve(`./src/contract.js`),
  );
  const installationHandle = await E(zoe).install(source, moduleFormat);

  const CONTRACT_NAME = 'bonsai';
  const INSTALLATION_REG_KEY = await E(registry).register(
    `${CONTRACT_NAME}installation`,
    installationHandle,
  );
  console.log('- SUCCESS! contract code installed on Zoe');
  console.log(`-- Contract Name: ${CONTRACT_NAME}`);
  console.log(`-- InstallationHandle Register Key: ${INSTALLATION_REG_KEY}`);

  // Save the constants somewhere where the UI and api can find it.
  const dappConstants = {
    CONTRACT_NAME,
    INSTALLATION_REG_KEY,
  };
  const defaultsFile = pathResolve(`../ui/src/conf/installationConstants.js`);
  console.log('writing', defaultsFile);
  const defaultsContents = `\
  // GENERATED FROM ${pathResolve('./deploy.js')}
  export default ${JSON.stringify(dappConstants, undefined, 2)};
  `;
  await fs.promises.writeFile(defaultsFile, defaultsContents);
}
