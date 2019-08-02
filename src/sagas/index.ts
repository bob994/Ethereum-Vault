import { all, fork } from '@redux-saga/core/effects';
import { balanceSagas } from './balance';
import { walletSagas } from './wallet';

export function* rootSaga() {
  yield all([fork(balanceSagas), fork(walletSagas)]);
}
