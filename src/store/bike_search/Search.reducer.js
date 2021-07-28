import {
  GET_STOLEN_BIKE
} from "./Search.action";

var initialState = {
  stolen_bikes: [],
};

const stolenBikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOLEN_BIKE:
      return {
        ...state,
        stolen_bikes: action.payload,
      }
    default:
      return state;
  }
};

export default stolenBikeReducer;
