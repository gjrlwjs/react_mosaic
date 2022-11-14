// import { configureStore, combineReducers } from "redux";

// import configureStore from "redux";
import { legacy_createStore, combineReducers } from "redux";
import { Reducers as gridReducers } from "react-redux-grid";

const rootReducer = combineReducers({
  ...gridReducers
});

export function configStore() {
  return legacy_createStore(rootReducer);
};