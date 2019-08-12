import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';
import { TransactionResponse } from 'ethers/providers';
import { ReduxState } from '../.';

interface Transaction {
  address: string;
  amount: number;
  name: string;
}

export const getTransactions = createAsyncAction(
  'GET_TRANSACTIONS_REQUEST',
  'GET_TRANSACTIONS_SUCCESS',
  'GET_TRANSACTIONS_FAILURE',
)<string, TransactionResponse[], undefined>();

export const makeTransaction = createAsyncAction(
  'MAKE_TRANSACTION_REQUEST',
  'MAKE_TRANSACTION_SUCCESS',
  'MAKE_TRANSACTION_FAILURE',
)<Transaction, undefined, undefined>();

export type GetTransactionsRequestAction = ActionType<
  typeof getTransactions.request
>;
export type GetTransactionsSuccessAction = ActionType<
  typeof getTransactions.success
>;
export type GetTransactionsFailureAction = ActionType<
  typeof getTransactions.failure
>;

export type MakeTransactionRequestAction = ActionType<
  typeof makeTransaction.request
>;
export type MakeTransactionSuccessAction = ActionType<
  typeof makeTransaction.success
>;
export type MakeTransactionFailureAction = ActionType<
  typeof makeTransaction.failure
>;

type TransactionsActions =
  | GetTransactionsRequestAction
  | GetTransactionsSuccessAction
  | GetTransactionsFailureAction
  | MakeTransactionRequestAction
  | MakeTransactionSuccessAction
  | MakeTransactionFailureAction;

export interface TransactionsState {
  transactions: TransactionResponse[];
  fetching: boolean;
  routeRedirect: boolean;
}

const INITIAL_STATE: TransactionsState = {
  transactions: [],
  fetching: false,
  routeRedirect: false,
};

export const transactionsReducer = createReducer<
  TransactionsState,
  TransactionsActions
>(INITIAL_STATE)
  .handleAction(getTransactions.request, state => ({
    ...state,
    fetching: true,
  }))
  .handleAction(getTransactions.success, (state, action) => ({
    ...state,
    transactions: action.payload,
    fetching: false,
  }))
  .handleAction(getTransactions.failure, state => ({
    ...state,
    fetching: false,
  }))
  .handleAction(makeTransaction.request, state => ({
    ...state,
    fetching: true,
    routeRedirect: false,
  }))
  .handleAction(makeTransaction.success, state => ({
    ...state,
    fetching: false,
    routeRedirect: true,
  }))
  .handleAction(makeTransaction.failure, state => ({
    ...state,
    fetching: false,
  }));

export const getTransactionsSelector = (state: ReduxState) =>
  state.transactions.transactions;
