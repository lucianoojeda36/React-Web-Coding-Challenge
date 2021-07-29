import {GET_STOLEN_BIKE, GET_ERROR_STOLEN_BIKE, GET_IS_LOADING_STOLEN_BIKE} from "./Search.action";

var initialState = {
  stolen_bikes: [],
  error_message: false,
  isLoading: false
};

const stolenBikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOLEN_BIKE:
      return {
        ...state,
        stolen_bikes: action.payload,
      }
      case GET_ERROR_STOLEN_BIKE:
      return {
        ...state,
        error_message: action.payload,
      }
      case GET_IS_LOADING_STOLEN_BIKE:
        return {
          ...state,
          isLoading: action.payload,
        }
    default:
      return state;
  }
};

export default stolenBikeReducer;
