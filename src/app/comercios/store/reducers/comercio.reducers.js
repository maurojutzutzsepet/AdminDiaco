import { comercioInterface } from "app/utils/comercio.utils";
import * as Actions from "../actions";
const initialState = {
  comercios: [],
  formatedComercio: new comercioInterface(),
};
const comercioReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_COMERCIOS: {
      return {
        ...state,
        comercios: action.payload,
      };
    }
    case Actions.CHANGE_KEY_COMERCIO: {
      return {
        ...state,
        formatedComercio: comercioInterface({
          ...state.formatedComercio,
          ...action.payload,
        }),
      };
    }
    case Actions.CLEAR_COMERCIO: {
      return {
        ...state,
        formatedComercio: new comercioInterface(),
      };
    }
    case Actions.SET_COMERCIO: {
      const { comercio } = action.payload;
      return {
        ...state,
        formatedComercio: comercioInterface(comercio),
      };
    }
    default: {
      return state;
    }
  }
};

export default comercioReducer;
