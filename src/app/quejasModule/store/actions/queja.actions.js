import { showMessage } from "app/store/actions";
import Axios from "axios";

export const FORMATED_QUEJA = "FORMATED_QUEJA";
export const SET_QUEJAS = "SET_QUEJAS";
export const SET_QUEJA = "SET_QUEJA";
export const CLEAR_QUEJA_REDUCER = "CLEAR_QUEJA_REDUCER";

export function changeKeyQueja(data) {
  return {
    type: FORMATED_QUEJA,
    payload: data,
  };
}

export function createQueja(dataSend) {
  const url = "https://maurojutzutzgt.herokuapp.com/api/quejas";
  return async (dispatch) => {
    try {
      const res = await Axios.post(url, dataSend);
      console.log("registrando queja", res);
      dispatch(
        showMessage({
          message: "Queja registrada",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrió un problema",
          variant: "error",
        })
      );
    }
  };
}

export function getAllQuejas(cui) {
  const url = `https://maurojutzutzgt.herokuapp.com/api/quejas/user/${cui}`;
  return async (dispatch) => {
    try {
      const res = await Axios.get(url);

      dispatch({
        type: SET_QUEJAS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrió un problema",
          variant: "error",
        })
      );
    }
  };
}

export function getQueja(id) {
  const url = `https://maurojutzutzgt.herokuapp.com/api/quejas/${id}`;
  return async (dispatch) => {
    try {
      const res = await Axios.get(url);

      dispatch({
        type: SET_QUEJA,
        payload: { queja: res.data },
      });
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrió un problema",
          variant: "error",
        })
      );
    }
  };
}

export function updateQueja(id, dataSend) {
  const url = `https://maurojutzutzgt.herokuapp.com/api/quejas/${id}`;
  return async (dispatch) => {
    try {
      const res = await Axios.put(url, dataSend);
      console.log("algo esta pasando", res);
      dispatch(
        showMessage({
          message: "Queja actualizada",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrió un problema",
          variant: "error",
        })
      );
    }
  };
}
export function clearQueja() {
  return {
    type: CLEAR_QUEJA_REDUCER,
  };
}
