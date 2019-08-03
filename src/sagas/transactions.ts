import { all, call, takeLatest, put, select } from '@redux-saga/core/effects';
import * as T from '../modules/transactions';
import { getHistory } from '../services/ether';
import { TransactionResponse } from 'ethers/providers';
import { getType } from 'typesafe-actions';

function* getTransactions(action: T.GetTransactionsRequestAction) {
  const transactions: TransactionResponse[] = yield call(
    getHistory,
    action.payload,
  );

  if (!transactions) {
    return console.log('Error'); // TODO: Notification
  }
  console.log(transactions);
  yield put(T.getTransactions.success(transactions));
}

export function* transactionsSagas() {
  yield all([takeLatest(getType(T.getTransactions.request), getTransactions)]);
}
