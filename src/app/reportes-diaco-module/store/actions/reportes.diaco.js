import { showMessage } from "app/store/actions";
import Axios from "axios";

export const SET_ALL_QUEJAS_DIACO = "SET_ALL_QUEJAS_DIACO";
export const SET_ALL_QUEJAS_ARRAY = "SET_ALL_QUEJAS_ARRAY";
export const CHANGE_KEY_FILTER = "CHANGE_KEY_FILTER";

const urlbase = "https://maurojutzutzgt.herokuapp.com/api/quejas/comercio";

export function getAllQuejas() {
  const url = `https://maurojutzutzgt.herokuapp.com/api/quejas`;
  return async (dispatch) => {
    try {
      const res = await Axios.get(url);

      dispatch({
        type: SET_ALL_QUEJAS_DIACO,
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

export function getAllQuejaByNit(dataSend) {
  const urlMunicipio = `${urlbase}/nit/${dataSend.nit}`;

  return async (dispatch) => {
    try {
      const res = await Axios.get(urlMunicipio);

      dispatch({
        type: SET_ALL_QUEJAS_ARRAY,
        payload: { quejas: res.data },
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

export function getAllQuejaMunicipio(dataSend) {
  const urlMunicipio = `${urlbase}/municipio/${dataSend.municipio}`;

  return async (dispatch) => {
    try {
      const res = await Axios.get(urlMunicipio);

      dispatch({
        type: SET_ALL_QUEJAS_ARRAY,
        payload: { quejas: res.data },
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

export function getAllQuejaDepartamento(dataSend) {
  const urlDpto = `${urlbase}/departamento/${dataSend.departamento}`;

  return async (dispatch) => {
    try {
      const res = await Axios.get(urlDpto);

      dispatch({
        type: SET_ALL_QUEJAS_ARRAY,
        payload: { quejas: res.data },
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
export function getAllQuejaRegion(dataSend) {
  const urlRegion = `${urlbase}/region/${dataSend.region}`;

  return async (dispatch) => {
    try {
      const res = await Axios.get(urlRegion);

      dispatch({
        type: SET_ALL_QUEJAS_ARRAY,
        payload: { quejas: res.data },
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

export function changeKeyFilter(data) {
  return {
    type: CHANGE_KEY_FILTER,
    payload: data,
  };
}
