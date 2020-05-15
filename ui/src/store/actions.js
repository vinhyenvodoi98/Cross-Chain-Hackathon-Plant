import { plants_init } from "../constant";

export const SERVER_CONNECTED = "SERVER_CONNECTED";
export const serverConnected = (connected) => async (dispatch) => {
  dispatch({
    type: SERVER_CONNECTED,
    connected,
  });
};

export const ACTIVATE_CONNECTION = "ACTIVATE_CONNECTION";
export const activateConnection = (active) => async (dispatch) => {
  dispatch({
    type: ACTIVATE_CONNECTION,
    active,
  });
};

export const UPDATE_PURSES = "UPDATE_PURSES";
export const updatePurses = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PURSES,
    purses: data,
  });
};

export const GET_ALL_PLANTS = "GET_ALL_PLANTS";
export const getAllPlants = () => (dispatch) => {
  dispatch({
    type: GET_ALL_PLANTS,
    plants: plants_init,
  });
};

export const CHANGE_STATE_PLANT = "CHANGE_STATE_PLANT";
export const changeStatePlant = (id, statePlant) => (dispatch, getState) => {
  let state = getState();
  let plants = state.plants;
  let plant = plants[id];
  plant.state = statePlant;
  dispatch({
    type: CHANGE_STATE_PLANT,
    plants,
  });
};

export const RESET_ALL = "RESET_ALL";
export const resetAll = () => (dispatch) => {
  dispatch({
    type: RESET_ALL,
  });
};
