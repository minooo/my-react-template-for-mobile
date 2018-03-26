import { createStore, applyMiddleware } from "redux";
import withRedux from "next-redux-wrapper";
import nextReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  // run the rootSaga initially
  store.runSagaTask()
  return store;
}

export default page => withRedux(configureStore)(nextReduxSaga(page));
