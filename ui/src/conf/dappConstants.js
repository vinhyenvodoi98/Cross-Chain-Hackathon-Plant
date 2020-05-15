// If this file defines window.__DAPP_CONSTANTS__ it will
// overide the defaults.js.
// eslint-disable-next-line no-underscore-dangle
import defaults from './defaults';
export default process.env.REACT_APP_DAPP_CONSTANTS_JSON
  ? JSON.parse(process.env.REACT_APP_DAPP_CONSTANTS_JSON)
  : defaults;
