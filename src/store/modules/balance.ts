import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';
import { BigNumber, formatEther } from 'ethers/utils';
import { Zero } from 'ethers/constants';
import { ReduxState } from '../.';

export const getBalance = createAsyncAction(
  'GET_BALANCE_REQUEST',
  'GET_BALANCE_SUCCESS',
  'GET_BALANCE_FAILURE',
)<undefined, BigNumber, undefined>();

export type GetBalanceRequestAction = ActionType<typeof getBalance.request>;
export type GetBalanceSuccessAction = ActionType<typeof getBalance.success>;
export type GetBalanceFailureAction = ActionType<typeof getBalance.failure>;

type BalanceActions =
  | GetBalanceRequestAction
  | GetBalanceSuccessAction
  | GetBalanceFailureAction;

export interface BalanceState {
  balance: BigNumber;
  fetching: boolean;
}

const INITIAL_STATE: BalanceState = {
  balance: Zero,
  fetching: false,
};

export const balanceReducer = createReducer<BalanceState, BalanceActions>(
  INITIAL_STATE,
)
  .handleAction(getBalance.request, state => ({ ...state, fetching: true }))
  .handleAction(getBalance.success, (state, action) => ({
    ...state,
    balance: action.payload,
  }))
  .handleAction(getBalance.failure, state => ({ ...state, fetching: false }));

export const balanceToString = (state: ReduxState) =>
  parseFloat(formatEther(state.balance.balance)).toFixed(6);
