import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatEther } from 'ethers/utils';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Card from '../../components/Card';

import MoreIcon from '../../assets/icons/more.svg';
import { getTransactionsSelector } from '../../store/modules/transactions';
import { useLocation, useRoute } from 'wouter';

export const Transactions = () => {
  const transactions = useSelector(getTransactionsSelector);
  const [, push] = useLocation();
  const [match] = useRoute('/');
  const [tableWidth, setTableWidth] = useState(0);

  const updateDimensions = () => {
    setTableWidth(
      window.document.getElementById('transactions-wrapper')!.offsetWidth - 80,
    );
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

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
      <PerfectScrollbar style={{ width: tableWidth }}>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{Rows}</tbody>
        </table>
      </PerfectScrollbar>
    </Card>
  );
};
