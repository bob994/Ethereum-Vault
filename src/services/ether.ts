import { ethers, Wallet } from 'ethers';
import {
  TransactionRequest,
  TransactionResponse,
  EtherscanProvider,
} from 'ethers/providers';
import { provider } from '..';
import { BigNumber } from 'ethers/utils';

export const connectToInfura = (): EtherscanProvider =>
  new ethers.providers.EtherscanProvider(
    'rinkeby',
    'a50a7ad13d194fa7bf65aeb198008b73',
  );

export const signInToWallet = (privateKey: string): Wallet =>
  new Wallet(privateKey, provider);

export const getBalanceFromWallet = async (
  wallet: Wallet,
): Promise<BigNumber> => {
  const balance = await wallet.getBalance();

  return balance;
};

export const sendTransaction = async (
  wallet: Wallet,
  transaction: TransactionRequest,
): Promise<TransactionResponse> => {
  const response = await wallet.sendTransaction(transaction);

  return response;
};

export const getHistory = async (
  address: string,
  from: string | number = 0,
  to: string | number = 'latest',
): Promise<TransactionResponse[]> => {
  const transactions = await provider.getHistory(address, from, to);

  return transactions;
};
