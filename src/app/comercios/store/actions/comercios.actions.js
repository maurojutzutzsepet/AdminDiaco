import { showMessage } from "app/store/actions";
import Axios from "axios";

export const GET_ALL_COMERCIOS = "GET_ALL_COMERCIOS";
export const CHANGE_KEY_COMERCIO = "CHANGE_KEY_COMERCIO";
export const SET_COMERCIO = "SET_COMERCIO";
export const CLEAR_COMERCIO = "CLEAR_COMERCIO";

export function getAllComercios() {
  const url = "https://maurojutzutzgt.herokuapp.com/api/comercio";
  return async (dispatch) => {
    try {
      const res = await Axios.get(url, { params: { includeQuejas: false } });

      dispatch({
        type: GET_ALL_COMERCIOS,
        payload: res.data,
      });
    } catch (error) {}
  };
}

export function createComercio(dataSend) {
  const url = "https://maurojutzutzgt.herokuapp.com/api/comercio";
  return async (dispatch) => {
    try {
      await Axios.post(url, dataSend);
      dispatch(
        showMessage({
          message: "Comercio registrado",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrio algun error",
          variant: "errror",
        })
      );
    }
  };
}

export function updateComercio(id, dataSend) {
  const url = `https://maurojutzutzgt.herokuapp.com/api/comercio/${id}`;
  return async (dispatch) => {
    try {
      await Axios.put(url, dataSend);
      dispatch(
        showMessage({
          message: "Comercio actualizado",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        showMessage({
          message: "Ocurrio algun error",
          variant: "errror",
        })
      );
    }
  };
}

export function getComercio(id) {
  const url = `https://maurojutzutzgt.herokuapp.com/api/comercio/${id}`;
  return async (dispatch) => {
    try {
      const res = await Axios.get(url);

      dispatch({
        type: SET_COMERCIO,
        payload: { comercio: res.data },
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

export function changeKeyComercio(data) {
  return {
    type: CHANGE_KEY_COMERCIO,
    payload: data,
  };
}

export function clearComercio() {
  return {
    type: CLEAR_COMERCIO,
  };
}
