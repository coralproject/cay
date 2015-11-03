import { combineReducers } from "redux";
import data from "./data";
import user from "./users";

const rootReducer = combineReducers({
  data, user
});

export default rootReducer;
