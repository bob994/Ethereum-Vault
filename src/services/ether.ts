import { ethers, Wallet } from 'ethers';
import { InfuraProvider } from 'ethers/providers';
import { provider } from '..';
import { BigNumber } from 'ethers/utils';

export const connectToInfura = (): InfuraProvider =>
  new ethers.providers.InfuraProvider('rinkeby', 'a50a7ad13d194fa7bf65aeb198008b73');

export const signInToWallet = (privateKey: string): Wallet => new Wallet(privateKey, provider);

export const getBalanceFromWallet = async (wallet: Wallet): Promise<BigNumber> => {
  const balance = await wallet.getBalance();

  return balance;
};
