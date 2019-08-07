import React from 'react';
import { useSelector } from 'react-redux';
import { formatEther } from 'ethers/utils';

import Card from '../../components/Card';

import MoreIcon from '../../assets/icons/more.svg';
import { getTransactionsSelector } from '../../store/modules/transactions';
import { useLocation, useRoute } from 'wouter';

export const Transactions = () => {
  const transactions = useSelector(getTransactionsSelector);
  const [, push] = useLocation();
  const [match] = useRoute('/');

  const Rows = transactions.map(transaction => (
    <tr key={transaction.hash}>
      <td>{transaction.from}</td>
      <td>{transaction.to}</td>
      <td>{formatEther(transaction.value)}</td>
    </tr>
  ));

  const goToWithdraw = () => {
    push('/withdraw');
  };

  const Footer = (
    <div className="center-button">
      <button className="button" type="button" onClick={goToWithdraw}>
        Withdraw
      </button>
    </div>
  );

  return (
    <Card
      title="Transactions History"
      icon={MoreIcon}
      footer={match ? Footer : undefined}
    >
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{Rows}</tbody>
        </table>
      </div>
    </Card>
  );
};
