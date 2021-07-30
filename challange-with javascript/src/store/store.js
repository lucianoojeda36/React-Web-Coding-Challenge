import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import stolenBikeReducer from './bike_search/Search.reducer'


const store = createStore(
  stolenBikeReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
