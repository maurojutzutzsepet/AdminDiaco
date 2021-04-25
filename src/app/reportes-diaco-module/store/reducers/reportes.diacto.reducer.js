import { filtroReporteInterface, filterQuejas } from "app/utils/reporte.utils";
import * as Actions from "../actions";
const initialSate = {
  quejas: [],
  filterReporte: new filtroReporteInterface(),
};

const reportesReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Actions.SET_ALL_QUEJAS_DIACO: {
      return {
        ...state,
        quejas: action.payload,
      };
    }
    case Actions.CHANGE_KEY_FILTER: {
      return {
        ...state,
        filterReporte: filtroReporteInterface({
          ...state.filterReporte,
          ...action.payload,
        }),
      };
    }
    case Actions.SET_ALL_QUEJAS_ARRAY: {
      const { quejas } = action.payload;

      return {
        ...state,
        quejas: filterQuejas(quejas),
      };
    }
    default: {
      return state;
    }
  }
};

export default reportesReducer;
