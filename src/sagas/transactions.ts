import { all, call, takeLatest, put, select } from '@redux-saga/core/effects';
import { getType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { TransactionResponse, TransactionRequest } from 'ethers/providers';
import * as T from '../store/modules/transactions';
import { getWallet } from '../store/modules/wallet';
import { getHistory, sendTransaction } from '../services/ether';
import { addContact, Contact } from '../utils/addContact';
import { parseEther } from 'ethers/utils';

function* getTransactions(action: T.GetTransactionsRequestAction) {
  const transactions: TransactionResponse[] = yield call(
    getHistory,
    action.payload,
  );

  if (!transactions) {
    return console.log('Error'); // TODO: Notification
  }

  yield put(T.getTransactions.success(transactions));
}

function* makeTransaction(action: T.MakeTransactionRequestAction) {
  const { address, amount, name } = action.payload;
  const wallet: Wallet = yield select(getWallet);

  const transactionRequest: TransactionRequest = {
    to: address,
    value: parseEther(amount.toString()),
  };

  const response = yield call(sendTransaction, wallet, transactionRequest);

  if (response) {
    if (name) {
      const contact: Contact = {
        name: name,
        address: address,
      };

      addContact(contact);
    }
  } else {
    return console.log('Error'); // TODO: Notification
  }
}

export function* transactionsSagas() {
  yield all([
    takeLatest(getType(T.getTransactions.request), getTransactions),
    takeLatest(getType(T.makeTransaction.request), makeTransaction),
  ]);
}
