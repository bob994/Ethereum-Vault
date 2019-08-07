import React, {
  useState,
  ChangeEvent,
  useEffect,
  FunctionComponent,
} from 'react';
import Card from '../../components/Card';
import { useDispatch } from 'react-redux';
import { makeTransaction } from '../../store/modules/transactions';
import { Contact } from '../../utils/addContact';
import { useLocation } from 'wouter';

interface Props {
  selectedContact: Contact | null;
}

export const WithdrawForm: FunctionComponent<Props> = ({ selectedContact }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [, push] = useLocation();

  useEffect(() => {
    if (selectedContact) {
      setAddress(selectedContact.address);
      setName(selectedContact.name);
    }
  }, [selectedContact]);

  const handleAddresChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAmounChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(makeTransaction.request({ address, amount, name }));
  };

  const handleCancel = () => {
    push('/');
  };

  const Footer = (
    <>
      <button
        type="button"
        className="button"
        onClick={handleSubmit}
        disabled={!address || !amount}
      >
        Submit
      </button>
      <button type="button" className="button" onClick={handleCancel}>
        Cancel
      </button>
    </>
  );

  return (
    <Card footer={Footer} title="New Transaction">
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
