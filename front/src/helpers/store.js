import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "../reducers/index";

const loggerMiddleware = createLogger();

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(loggerMiddleware);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
