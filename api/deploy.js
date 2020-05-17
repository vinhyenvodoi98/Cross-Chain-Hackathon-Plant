import fs from "fs";
import installationConstants from "../ui/src/conf/installationConstants.js";
import { E } from "@agoric/eventual-send";
import harden from "@agoric/harden";
import { makeGetInstanceHandle } from "@agoric/zoe/src/clientSupport";
import makeAmountMath from "@agoric/ertp/src/amountMath";

// import { plantImgs } from "./plantImgs";

export default async function deployApi(
  referencesPromise,
  { bundleSource, pathResolve }
) {
  // Let's wait for the promise to resolve.
  const references = await referencesPromise;

  // Unpack the references.
  const { wallet, uploads: scratch, spawner, zoe, registry, http } = references;

  const { INSTALLATION_REG_KEY, CONTRACT_NAME } = installationConstants;

  const movieContractInstallationHandle = await E(registry).get(
    INSTALLATION_REG_KEY
  );

  const issuersArray = await E(wallet).getIssuers();
  const issuers = new Map(issuersArray);
  const moolaIssuer = issuers.get("moola");

  const getLocalAmountMath = (issuer) =>
    Promise.all([
      E(issuer).getBrand(),
      E(issuer).getMathHelpersName(),
    ]).then(([brand, mathHelpersName]) =>
      makeAmountMath(brand, mathHelpersName)
    );

  const moolaAmountMath = await getLocalAmountMath(moolaIssuer);
  const expectedAmount = moolaAmountMath.make(22);
  console.log(expectedAmount);

  const MONEY_BRAND_REGKEY = await E.G(E(wallet).getIssuerNames(moolaIssuer)).brandRegKey;

  const issuerKeywordRecords = harden({ Money: moolaIssuer });
  const adminInvite = await E(zoe).makeInstance(
    movieContractInstallationHandle,
    issuerKeywordRecords,
    {
      name: [
        "Lotus",
        "Sun",
        "plant3",
        "plant4",
        "plant5",
        "plant6",
        "plant7",
        "plant8",
        "plant9",
        "plant10",
      ],
      count: 10,
      // price: 20,
      // plantImgs,
      expectedAmount,
    }
  );
  console.log("- SUCCESS! contract instance is running on Zoe");

  const inviteIssuer = await E(zoe).getInviteIssuer();
  const getInstanceHandle = makeGetInstanceHandle(inviteIssuer);
  const instanceHandle = await getInstanceHandle(adminInvite);
  const { publicAPI, terms } = await E(zoe).getInstanceRecord(instanceHandle);
  // const invite = await E(publicAPI).makeBuyerInvite();
  // const buyerInvite = await E(inviteIssuer).claim(invite);

  const { payout: adminPayoutP, outcome: adminOutcomeP, cancelObj } = await E(
    zoe
  ).offer(adminInvite);

  const outcome = await adminOutcomeP;
  console.log(`-- ${outcome}`);

  const INSTANCE_REG_KEY = await E(registry).register(
    `${CONTRACT_NAME}instance`,
    instanceHandle
  );
  const plantIssuer = await E(publicAPI).getPlantIssuer();
  const PLANT_ISSUER_REGKEY = await E(registry).register(`${CONTRACT_NAME}plant`, plantIssuer);
  const PLANT_BRAND_REGKEY = await E(registry).register(`plant`, await E(plantIssuer).getBrand());

  console.log(`-- Contract Name: ${CONTRACT_NAME}`);
  console.log(`-- InstanceHandle Register Key: ${INSTANCE_REG_KEY}`);
  console.log(`-- PLANT_ISSUER_REGKEY: ${PLANT_ISSUER_REGKEY}`);
  console.log(`-- PLANT_BRAND_REGKEY: ${PLANT_BRAND_REGKEY}`);
  console.log(`-- MONEY_BRAND_REGKEY: ${MONEY_BRAND_REGKEY}`)

  const { source, moduleFormat } = await bundleSource(
    pathResolve("./src/handler.js")
  );

  // Install it on the spawner
  const handlerInstall = E(spawner).install(source, moduleFormat);

  // Spawn the running code
  const brandPs = [];
  const keywords = [];
  Object.entries(issuerKeywordRecords).map(async ([keyword, issuer]) => {
    keywords.push(keyword);
    brandPs.push(E(issuer).getBrand());
  });

  const handler = E(handlerInstall).spawn({
    registry,
    brandPs,
    keywords,
    publicAPI,
  });

  await E(http).registerAPIHandler(handler);

  // Re-save the constants somewhere where the UI and api can find it.
  const dappConstants = {
    INSTANCE_REG_KEY,
    brandRegKeys: { Money: MONEY_BRAND_REGKEY, Plant: PLANT_BRAND_REGKEY },
    issuerRegKeys: { Plant: PLANT_ISSUER_REGKEY },
    BRIDGE_URL: "http://127.0.0.1:8000",
    API_URL: "http://127.0.0.1:8000",
  };
  const defaultsFile = pathResolve(`../ui/src/conf/defaults.js`);
  console.log("writing", defaultsFile);
  const defaultsContents = `\
  // GENERATED FROM ${pathResolve("./deploy.js")}
  export default ${JSON.stringify(dappConstants, undefined, 2)};
  `;
  await fs.promises.writeFile(defaultsFile, defaultsContents);
}
