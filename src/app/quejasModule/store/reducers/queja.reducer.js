import { quejaInterface } from "app/utils/quejas.utils";
import * as Actions from "../actions";
const initialSate = {
  formatedQueja: new quejaInterface(),
  quejas: [],
};

const quejaReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Actions.FORMATED_QUEJA: {
      return {
        ...state,
        formatedQueja: quejaInterface({
          ...state.formatedQueja,
          ...action.payload,
        }),
      };
    }
    case Actions.SET_QUEJA: {
      const { queja } = action.payload;
      return {
        ...state,
        formatedQueja: quejaInterface({
          descripcion: queja.descripcion,
          nit: queja.comercio.nit,
        }),
      };
    }
    case Actions.CLEAR_QUEJA_REDUCER: {
      return {
        ...state,
        formatedQueja: new quejaInterface(),
      };
    }
    case Actions.SET_QUEJAS: {
      return {
        ...state,
        quejas: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default quejaReducer;
