import { all, call, takeLatest, put, select } from '@redux-saga/core/effects';
import { getType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { TransactionResponse, TransactionRequest } from 'ethers/providers';
import * as T from '../store/modules/transactions';
import { getWallet } from '../store/modules/wallet';
import { getHistory, sendTransaction } from '../services/ether';
import { addContact, Contact } from '../utils/addContact';
import { parseEther } from 'ethers/utils';
import { toast } from 'react-toastify';

function* getTransactions(action: T.GetTransactionsRequestAction) {
  const transactions: TransactionResponse[] = yield call(
    getHistory,
    action.payload,
  );

  try {
    yield put(T.getTransactions.success(transactions));
  } catch (error) {
    toast.error(error.reason);
  }
}

function* makeTransaction(action: T.MakeTransactionRequestAction) {
  const { address, amount, name } = action.payload;
  const wallet: Wallet = yield select(getWallet);

  const transactionRequest: TransactionRequest = {
    to: address,
    value: parseEther(amount.toString()),
  };

  try {
    yield call(sendTransaction, wallet, transactionRequest);

    if (name) {
      const contact: Contact = {
        name: name,
        address: address,
      };

      addContact(contact);
    }

    yield put(T.makeTransaction.success());
    toast.success('Transaction created');
  } catch (error) {
    toast.error(error.reason);
  }
}

export function* transactionsSagas() {
  yield all([
    takeLatest(getType(T.getTransactions.request), getTransactions),
    takeLatest(getType(T.makeTransaction.request), makeTransaction),
  ]);
}
