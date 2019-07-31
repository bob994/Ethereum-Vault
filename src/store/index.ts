import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { walletReducer } from '../modules/wallet';

import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  wallet: walletReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { store };
