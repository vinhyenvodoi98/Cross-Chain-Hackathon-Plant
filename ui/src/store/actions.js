import { doFetch } from 'utils/fetch-websocket';
import { plants_init } from '../constant';

export const SERVER_CONNECTED = 'SERVER_CONNECTED';
export const serverConnected = (connected) => async (dispatch) => {
  dispatch({
    type: SERVER_CONNECTED,
    connected,
  });
};

export const ACTIVATE_CONNECTION = 'ACTIVATE_CONNECTION';
export const activateConnection = (active) => async (dispatch) => {
  dispatch({
    type: ACTIVATE_CONNECTION,
    active,
  });
};

export const UPDATE_PURSES = 'UPDATE_PURSES';
export const updatePurses = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PURSES,
    purses: data,
  });
};

export const UPDATE_PLANTS = 'UPDATE_PLANTS';
export const updatePlants = (plants) => (dispatch) => {
  dispatch({
    type: UPDATE_PLANTS,
    plants,
  });
};

export const GET_ALL_PLANTS = 'GET_ALL_PLANTS';
export const getAllPlants = () => (dispatch) => {
  dispatch({
    type: GET_ALL_PLANTS,
    plants: plants_init,
  });
};

export const CHANGE_STATE_PLANT = 'CHANGE_STATE_PLANT';
export const changeStatePlant = (id, _state) => (dispatch, getState) => {
  let state = getState();
  let plants = state.plants;
  let plant = plants[id - 1];
  plant.state = _state;
  dispatch({
    type: CHANGE_STATE_PLANT,
    plants,
  });
};

export const RESET_ALL = 'RESET_ALL';
export const resetAll = () => (dispatch) => {
  dispatch({
    type: RESET_ALL,
  });
};

///// Message handler

export const messageHandler = (message) => async (dispatch) => {
  if (!message) return;
  const { type, data } = message;
  console.log('wallet <', message);
  if (type === 'walletUpdatePurses') {
    //update Pureses
    dispatch(updatePurses(JSON.parse(data)));
  } else if (type === 'walletOfferDescriptions') {
    // TODO what is walletOfferDescriptions do ?
    console.log(data);
    // dispatch(updateOffers(data));
  } else if (type === 'walletOfferAdded') {
    window.open(data);
  }
};

export const apiMessageHandler = (message) => async (dispatch) => {
  if (!message) return;
  const { type, data } = message;
  if (type === 'bonsai/getAvalablePlantResponse') {
    dispatch(updatePlants(data));
    console.log('data', data);
  }
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
export const createOffer = () => async (dispatch, getState) => {
  const state = getState();
  console.log(state);
  const now = Date.now();
  const offer = {
    id: now,

    instanceRegKey: state.instanceId,

    hooks: {
      publicAPI: {
        getInvite: ['makeBuyerInvite'], // E(publicAPI).makeBuyerInvite()
      },
    },

    proposalTemplate: {
      want: {
        Plant: {
          pursePetname: 'Garden',
          extent: [{ plantId: 1 }],
        },
      },
      give: {
        Money: {
          pursePetname: 'Fun budget',
          extent: 50,
        },
      },
      exit: { onDemand: null },
    },
  };
  console.log('wallet > ', offer);
  doFetch({
    type: 'walletAddOffer',
    data: offer,
  });
};
