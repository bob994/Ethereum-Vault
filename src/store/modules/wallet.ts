import {
  createAsyncAction,
  createStandardAction,
  createReducer,
  ActionType,
} from 'typesafe-actions';
import { Wallet } from 'ethers';
import { ReduxState } from '../.';

export const signIn = createAsyncAction(
  'SIGN_IN_REQUEST',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',
)<string, Wallet, undefined>();

export type SignInRequestAction = ActionType<typeof signIn.request>;
export type SignInSuccessAction = ActionType<typeof signIn.success>;
export type SignInFailureAction = ActionType<typeof signIn.failure>;

export const logout = createStandardAction('LOGOUT')<undefined>();

export type LogoutAction = ActionType<typeof logout>;

type WalletActions =
  | SignInRequestAction
  | SignInSuccessAction
  | SignInFailureAction
  | LogoutAction;

export interface WalletState {
  wallet: Wallet | null;
  fetching: boolean;
}

const INITIAL_STATE: WalletState = {
  wallet: null,
  fetching: false,
};

export const walletReducer = createReducer<WalletState, WalletActions>(
  INITIAL_STATE,
)
  .handleAction(signIn.request, state => ({
    ...state,
    fetching: true,
  }))
  .handleAction(signIn.success, (state, action) => ({
    ...state,
    wallet: action.payload,
    fetching: false,
  }))
  .handleAction(signIn.failure, state => ({ ...state, fetching: false }))
  .handleAction(logout, () => ({ ...INITIAL_STATE }));

export const getWallet = (state: ReduxState) => state.wallet.wallet;
