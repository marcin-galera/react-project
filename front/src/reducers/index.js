import bookReducer from "./bookReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  bookReducer: bookReducer,
});

export default rootReducer;
