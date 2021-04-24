import Axios from "axios";
import { showMessage } from "app/store/actions";

export const SAVED_USER = "SAVED_USER";

export function loginDiaco(body) {
  return async (dispatch) => {
    try {
      const res = await Axios.post(
        "https://maurojutzutzgt.herokuapp.com/api/auth/signin",
        body
      );

      dispatch({
        type: SAVED_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log("invalida ", error);
      dispatch(
        showMessage({
          message: "Contraseña incorrecta",
          variant: "error",
        })
      );
    }
  };
}

export function signupDiaco(body) {
  return async (dispatch) => {
    try {
      const res = await Axios.post(
        "https://maurojutzutzgt.herokuapp.com/api/auth/signup",
        body
      );
      console.log(res);
      dispatch(
        showMessage({
          message: "Usuario creado",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        showMessage({
          message: "Usuario existente",
          variant: "error",
        })
      );
    }
  };
}
