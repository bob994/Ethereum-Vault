import { all, call, takeLatest, put, select } from '@redux-saga/core/effects';
import { getType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { BigNumber } from 'ethers/utils';
import { ReduxState } from '../store';
import { getBalanceFromWallet } from '../services/ether';
import * as B from '../store/modules/balance';
import { toast } from 'react-toastify';

function* getBalance() {
  const wallet: Wallet | null = yield select(
    (state: ReduxState) => state.wallet.wallet,
  );

  if (!wallet) {
    return toast.error('Error');
  }

  const balance: BigNumber = yield call(getBalanceFromWallet, wallet);

  if (!balance) {
    return toast.error('Error');
  }

  yield put(B.getBalance.success(balance));
}

export function* balanceSagas() {
  yield all([takeLatest(getType(B.getBalance.request), getBalance)]);
}
