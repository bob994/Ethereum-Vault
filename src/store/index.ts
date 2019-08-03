import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { balanceReducer, BalanceState } from '../modules/balance';
import {
  transactionsReducer,
  TransactionsState,
} from '../modules/transactions';
import { walletReducer, WalletState } from '../modules/wallet';

import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionsReducer,
  wallet: walletReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export interface ReduxState {
  balance: BalanceState;
  transactions: TransactionsState;
  wallet: WalletState;
}

export { store };
