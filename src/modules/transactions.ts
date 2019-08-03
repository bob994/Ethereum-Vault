import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';
import { TransactionResponse } from 'ethers/providers';

export const getTransactions = createAsyncAction(
  'GET_TRANSACTIONS_REQUEST',
  'GET_TRANSACTIONS_SUCCESS',
  'GET_TRANSACTIONS_FAILURE',
)<string, TransactionResponse[], undefined>();

export type GetTransactionsRequestAction = ActionType<
  typeof getTransactions.request
>;
export type GetTransactionsSuccessAction = ActionType<
  typeof getTransactions.success
>;
export type GetTransactionsFailureAction = ActionType<
  typeof getTransactions.failure
>;

type TransactionsActions =
  | GetTransactionsRequestAction
  | GetTransactionsSuccessAction
  | GetTransactionsFailureAction;

export interface TransactionsState {
  transactions: TransactionResponse[];
  fetching: boolean;
}

const INITIAL_STATE: TransactionsState = {
  transactions: [],
  fetching: false,
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
  .handleAction(getTransactions.failure, (state, action) => ({
    ...state,
    fetching: false,
  }));
