import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route } from 'wouter';

import { getWallet, logout } from '../store/modules/wallet';

import { Transactions } from './partials/Transactions';
import { Withdraw } from './partials/Withdraw';
import { AccountInfo } from './partials/AccountInfo';
import { Loader } from '../components/Loader';
import Button from '../components/Button';

export const Home = () => {
  const wallet = useSelector(getWallet);
  const dispatch = useDispatch();
  const [, push] = useLocation();

  useEffect(() => {
    if (!wallet) {
      push('/sign-in');
    }
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!wallet) return <Loader />;

  return (
    <>
      <header className="d-flex justify-content-end p-3">
        <Button onClick={handleLogout}>Logout</Button>
      </header>
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
    </>
  );
};
