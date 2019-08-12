import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/Card';

import { ReactComponent as BalanceIcon } from '../../assets/icons/ethereum.svg';
import { balanceToString, getBalance } from '../../store/modules/balance';

export const Balance = () => {
  const balance = useSelector(balanceToString);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance.request());
  }, [dispatch]);

  return (
    <Card title="Balance" Icon={BalanceIcon}>
      <div className="balance">
        {balance}
        <small>ETH</small>
      </div>
    </Card>
  );
};
