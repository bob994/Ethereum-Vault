import { all, call, takeLatest, put } from '@redux-saga/core/effects';
import { getType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { isHexString } from 'ethers/utils';
import { signInToWallet } from '../services/ether';
import * as W from '../store/modules/wallet';

function* signIn(action: W.SignInRequestAction) {
  const privateKey = action.payload;

  if (!isHexString(privateKey)) {
    return console.log('Error'); // TODO: Notification
  }

  const wallet: Wallet = yield call(signInToWallet, privateKey);

  if (wallet) {
    yield put(W.signIn.success(wallet));
  } else {
    return console.log('Error'); // TODO: Notification
  }
}

export function* walletSagas() {
  yield all([takeLatest(getType(W.signIn.request), signIn)]);
}
