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

import { ReactComponent as TransactionsIcon } from '../../assets/icons/blockchain.svg';
import { Loader } from '../../components/Loader';
import Button from '../../components/Button';

export const Transactions = () => {
  const [tableWidth, setTableWidth] = useState(0);
  const wallet = useSelector(getWallet)!;
  const transactions = useSelector(getTransactionsSelector);
  const dispatch = useDispatch();
  const [, push] = useLocation();
  const [match] = useRoute('/');

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    dispatch(getTransactions.request(wallet.address));

    const timeout = setInterval(() => {
      dispatch(getTransactions.request(wallet.address));
    }, 15000);
    return () => {
      clearInterval(timeout);
    };
  }, [dispatch, wallet.address]);

  const updateDimensions = () => {
    setTableWidth(
      window.document.getElementById('transactions-wrapper')!.offsetWidth - 80,
    );
  };

  const goToWithdraw = () => {
    push('/withdraw');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const Footer = (
    <div className="center-button">
      <Button variant="rounded" onClick={goToWithdraw}>
        Withdraw
      </Button>
    </div>
  );

  const Rows = transactions.map((transaction, i) => (
    <tr key={i}>
      <td>{transaction.from}</td>
      <td>{transaction.to}</td>
      <td title={formatEther(transaction.value)}>
        {parseFloat(formatEther(transaction.value)).toFixed(6)}
      </td>
    </tr>
  ));

  return (
    <Card
      title="Transactions History"
      Icon={TransactionsIcon}
      footer={match ? Footer : undefined}
    >
      {transactions.length > 0 ? (
        <PerfectScrollbar style={{ width: tableWidth }}>
          <table className="table table-borderless table-hover">
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
