import { combineReducers } from "redux";
import data from "./data";
import userData from "./users";

const rootReducer = combineReducers({
  data, userData
});

export default rootReducer;
