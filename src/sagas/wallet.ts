import { all, call, takeLatest, put } from '@redux-saga/core/effects';
import { getType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { isHexString } from 'ethers/utils';
import { signInToWallet } from '../services/ether';
import * as W from '../store/modules/wallet';
import { toast } from 'react-toastify';

function* signIn(action: W.SignInRequestAction) {
  const privateKey = action.payload;

  if (!isHexString(privateKey)) {
    return toast.error('wrong address');
  }

  try {
    const wallet: Wallet = yield call(signInToWallet, privateKey);

    yield put(W.signIn.success(wallet));
  } catch (error) {
    toast.error(error.reason);
  }
}

export function* walletSagas() {
  yield all([takeLatest(getType(W.signIn.request), signIn)]);
}
