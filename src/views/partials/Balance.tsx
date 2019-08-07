import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../../components/Card';

import EthereumIcon from '../../assets/icons/ethereum.svg';
import { balanceToString } from '../../store/modules/balance';

export const Balance = () => {
  const balance = useSelector(balanceToString);

  return (
    <Card title="Balance" icon={EthereumIcon}>
      <div className="balance">
        {balance} <small>Eth</small>
      </div>
    </Card>
  );
};
