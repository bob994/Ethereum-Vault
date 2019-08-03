import { all, fork } from '@redux-saga/core/effects';
import { balanceSagas } from './balance';
import { transactionsSagas } from './transactions';
import { walletSagas } from './wallet';

export function* rootSaga() {
  yield all([fork(balanceSagas), fork(transactionsSagas), fork(walletSagas)]);
}
