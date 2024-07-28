import { createStore, applyMiddleware, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./reducers/userReducer";
import userSaga from "./sagas/userSaga";

const rootReducer = combineReducers({
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);

export default store;
