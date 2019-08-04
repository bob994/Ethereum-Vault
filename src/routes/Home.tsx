import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'wouter';
import { getBalance, balanceToString } from '../modules/balance';
import { getWallet } from '../modules/wallet';
import {
  getTransactions,
  getTransactionsSelector,
} from '../modules/transactions';
import { formatEther } from 'ethers/utils';
import EthereumIcon from '../assets/icons/ethereum.svg';
import MoreIcon from '../assets/icons/more.svg';
import CopyIcon from '../assets/icons/copy.svg';
import Card from '../components/Card';

export const Home = () => {
  const wallet = useSelector(getWallet);
  const balance = useSelector(balanceToString);
  const transactions = useSelector(getTransactionsSelector);
  const dispatch = useDispatch();
  const [, push] = useLocation();

  useEffect(() => {
    if (!wallet) {
      push('/sign-in');
    } else {
      dispatch(getBalance.request());
    }

    if (wallet && transactions.length === 0) {
      dispatch(getTransactions.request(wallet.address));
    }
  });

  return (
    <div className="content">
      <div className="content-left">
        <Card
          title="Address"
          icon={CopyIcon}
          content={
            wallet ? (
              <>
                {wallet.address}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                    wallet.address
                  }`}
                />
              </>
            ) : (
              ''
            )
          }
        />
        <Card
          title="Balance"
          icon={EthereumIcon}
          content={
            <>
              {balance} <small>Eth</small>
            </>
          }
          className="is-balance"
        />
      </div>
      <div className="content-right">
        <Card
          title="Transactions History"
          icon={MoreIcon}
          content={
            transactions
              ? transactions.map(transaction => (
                  <li key={transaction.hash}>
                    {transaction.from} - {transaction.to} -{' '}
                    {formatEther(transaction.value)}
                  </li>
                ))
              : undefined
          }
          footer={
            <div className="center-button">
              <button className="button" type="button">
                Withdraw
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};
