// Allow the runtime to override the defaults with __DAPP_CONSTANTS__
import defaults from 'conf/defaults.js';

// eslint-disable-next-line no-underscore-dangle
export default process.env.REACT_APP_DAPP_CONSTANTS_JSON
  ? JSON.parse(process.env.REACT_APP_DAPP_CONSTANTS_JSON)
  : defaults;
