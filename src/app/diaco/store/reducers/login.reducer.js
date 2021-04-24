import * as Actions from "../actions";
const initialState = {
  infoUser: null,
};
const loginReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SAVED_USER: {
      return {
        ...state,
        infoUser: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
