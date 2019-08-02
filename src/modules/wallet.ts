import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';
import { Wallet } from 'ethers';
import { ReduxState } from '../store';

const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST' as const;
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS' as const;
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE' as const;

export const signIn = createAsyncAction(SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE)<
  string,
  Wallet,
  undefined
>();

export type SignInRequestAction = ActionType<typeof signIn.request>;
export type SignInSuccessAction = ActionType<typeof signIn.success>;
export type SignInFailureAction = ActionType<typeof signIn.failure>;

type WalletActions = SignInRequestAction | SignInSuccessAction | SignInFailureAction;

export interface WalletState {
  wallet: Wallet | null;
  fetching: boolean;
}

const INITIAL_STATE: WalletState = {
  wallet: null,
  fetching: false,
};

export const walletReducer = createReducer<WalletState, WalletActions>(INITIAL_STATE)
  .handleAction(signIn.request, state => ({
    ...state,
    fetching: true,
  }))
  .handleAction(signIn.success, (state, action) => ({
    ...state,
    wallet: action.payload,
    fetching: false,
  }))
  .handleAction(signIn.failure, state => ({ ...state, fetching: false }));

export const getWallet = (state: ReduxState) => state.wallet.wallet;
