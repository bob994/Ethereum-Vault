import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route } from 'wouter';

import { getBalance } from '../store/modules/balance';
import { getWallet } from '../store/modules/wallet';
import {
  getTransactions,
  getTransactionsSelector,
} from '../store/modules/transactions';

import { Loader } from '../components/Loader';
import { Transactions } from './partials/Transactions';
import { Withdraw } from './partials/Withdraw';
import { AccountInfo } from './partials/AccountInfo';

export const Home = () => {
  const wallet = useSelector(getWallet);
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

  if (!wallet || transactions.length === 0) return <Loader />;

  return (
    <div className="row">
      <div className="col-md-5 d-flex flex-column">
        <Switch>
          <Route path="/" component={AccountInfo} />
          <Route path="/withdraw" component={Withdraw} />
        </Switch>
      </div>
      <div className="col-md-7 d-flex" id="transactions-wrapper">
        <Transactions />
      </div>
    </div>
  );
};
