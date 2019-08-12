import React, {
  useState,
  ChangeEvent,
  useEffect,
  FunctionComponent,
} from 'react';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { makeTransaction } from '../../store/modules/transactions';
import { Contact } from '../../utils/addContact';
import { useLocation } from 'wouter';
import { ReduxState } from '../../store';
import { usePrevious } from '../../utils/usePrevious';
import { ReactComponent as WithdrawIcon } from '../../assets/icons/transaction.svg';
import Button from '../../components/Button';

interface Props {
  selectedContact: Contact | null;
}

export const WithdrawForm: FunctionComponent<Props> = ({ selectedContact }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const routeRedirect = useSelector(
    (state: ReduxState) => state.transactions.routeRedirect,
  );
  const prevRouteRedirect = usePrevious(routeRedirect);

  const dispatch = useDispatch();
  const [, push] = useLocation();

  useEffect(() => {
    if (selectedContact) {
      setAddress(selectedContact.address);
      setName(selectedContact.name);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (prevRouteRedirect !== undefined && routeRedirect) {
      push('/');
    }
  }, [routeRedirect, prevRouteRedirect]);

  const handleAddresChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAmounChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      makeTransaction.request({ address, amount: parseFloat(amount), name }),
    );
  };

  const handleCancel = () => {
    push('/');
  };

  const Footer = (
    <>
      <Button
        variant="rounded"
        onClick={handleSubmit}
        disabled={!address || !amount}
      >
        Submit
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </>
  );

  return (
    <Card footer={Footer} title="New Transaction" Icon={WithdrawIcon}>
      <>
        <div className="input-group">
          <input
            type="text"
            className="input"
            id="address"
            value={address}
            onChange={handleAddresChange}
          />
          <label className="input-label" htmlFor="address">
            Address
          </label>
        </div>
        <div className="input-group">
          <input
            type="number"
            className="input"
            id="address"
            value={amount}
            onChange={handleAmounChange}
            min="0"
            step="0.1"
          />
          <label className="input-label" htmlFor="address">
            Amount (Ether)
          </label>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input"
            id="address"
            value={name}
            onChange={handleNameChange}
          />
          <label className="input-label" htmlFor="address">
            Name
          </label>
        </div>
      </>
    </Card>
  );
};
