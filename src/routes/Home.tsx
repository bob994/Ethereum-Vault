import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'wouter';
import { getBalance, balanceToString } from '../modules/balance';
import { getWallet } from '../modules/wallet';

export const Home = () => {
  const wallet = useSelector(getWallet);
  const balance = useSelector(balanceToString);
  const dispatch = useDispatch();
  const [, push] = useLocation();

  useEffect(() => {
    if (!wallet) {
      push('/sign-in');
    } else {
      dispatch(getBalance.request());
    }
  });

  return (
    <div>
      <h1>{wallet ? wallet.address : 'connect first'}</h1>
      <h2>{balance}</h2>
    </div>
  );
};
