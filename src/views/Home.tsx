import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route } from 'wouter';

import { getWallet } from '../store/modules/wallet';

import { Transactions } from './partials/Transactions';
import { Withdraw } from './partials/Withdraw';
import { AccountInfo } from './partials/AccountInfo';
import { Loader } from '../components/Loader';

export const Home = () => {
  const wallet = useSelector(getWallet);
  const [, push] = useLocation();

  useEffect(() => {
    if (!wallet) {
      push('/sign-in');
    }
  });

  if (!wallet) return <Loader />;

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
