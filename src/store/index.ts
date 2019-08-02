import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { balanceReducer, BalanceState } from '../modules/balance';
import { walletReducer, WalletState } from '../modules/wallet';

import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  balance: balanceReducer,
  wallet: walletReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export interface ReduxState {
  balance: BalanceState;
  wallet: WalletState;
}

export { store };
