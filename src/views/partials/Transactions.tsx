import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatEther } from 'ethers/utils';
import { useLocation, useRoute } from 'wouter';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { getWallet } from '../../store/modules/wallet';
import {
  getTransactionsSelector,
  getTransactions,
} from '../../store/modules/transactions';

import Card from '../../components/Card';

import MoreIcon from '../../assets/icons/more.svg';
import { Loader } from '../../components/Loader';

export const Transactions = () => {
  const [tableWidth, setTableWidth] = useState(0);
  const wallet = useSelector(getWallet)!;
  const transactions = useSelector(getTransactionsSelector);
  const dispatch = useDispatch();
  const [, push] = useLocation();
  const [match] = useRoute('/');

  useEffect(() => {
    dispatch(getTransactions.request(wallet.address));
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    setTableWidth(
      window.document.getElementById('transactions-wrapper')!.offsetWidth - 80,
    );
  };

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

  const Rows = transactions.map(transaction => (
    <tr key={transaction.hash}>
      <td>{transaction.from}</td>
      <td>{transaction.to}</td>
      <td>{formatEther(transaction.value)}</td>
    </tr>
  ));

  return (
    <Card
      title="Transactions History"
      icon={MoreIcon}
      footer={match ? Footer : undefined}
    >
      {transactions.length === 0 ? (
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
      ) : (
        <Loader />
      )}
    </Card>
  );
};
