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
import InputGroup from '../../components/InputGroup';
import { balanceToString } from '../../store/modules/balance';

interface Props {
  selectedContact: Contact | null;
}

export const WithdrawForm: FunctionComponent<Props> = ({ selectedContact }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const balance = useSelector(balanceToString);
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
    if (
      prevRouteRedirect !== undefined &&
      !prevRouteRedirect &&
      routeRedirect
    ) {
      push('/');
    }
  }, [routeRedirect, prevRouteRedirect, push]);

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
      <InputGroup
        type="text"
        id="address"
        value={address}
        onChange={handleAddresChange}
        label="Address"
      />
      <InputGroup
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmounChange}
        label="Amount (ETH)"
        helpertext={`Balance: ${balance}ETH`}
      />
      <InputGroup
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        label="Name"
      />
    </Card>
  );
};
