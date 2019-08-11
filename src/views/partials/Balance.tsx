import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/Card';

import EthereumIcon from '../../assets/icons/ethereum.svg';
import { balanceToString, getBalance } from '../../store/modules/balance';

export const Balance = () => {
  const balance = useSelector(balanceToString);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance.request());
  }, []);

  return (
    <Card title="Balance" icon={EthereumIcon}>
      <div className="balance">
        {parseFloat(balance).toFixed(6)}
        <small>ETH</small>
      </div>
    </Card>
  );
};
