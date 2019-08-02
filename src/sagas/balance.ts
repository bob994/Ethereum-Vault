import { all, call, takeLatest, put, select } from '@redux-saga/core/effects';
import { getType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { BigNumber } from 'ethers/utils';
import { ReduxState } from '../store';
import { getBalanceFromWallet } from '../services/ether';
import * as B from '../modules/balance';

function* getBalance() {
  const wallet: Wallet | null = yield select((state: ReduxState) => state.wallet.wallet);

  if (!wallet) {
    return console.log('Error'); // TODO: Notification
  }

  const balance: BigNumber = yield call(getBalanceFromWallet, wallet);

  if (balance) {
    yield put(B.getBalance.success(balance));
  }
}

export function* balanceSagas() {
  yield all([takeLatest(getType(B.getBalance.request), getBalance)]);
}
