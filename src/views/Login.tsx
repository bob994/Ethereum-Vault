import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, getWallet } from '../store/modules/wallet';
import { useLocation } from 'wouter';
import Card from '../components/Card';
import { ReactComponent as LoginIcon } from '../assets/icons/login.svg';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';

export const SignIn = () => {
  const wallet = useSelector(getWallet);
  const dispatch = useDispatch();
  const [privateKey, setPrivateKey] = useState('');
  const [, push] = useLocation();

  useEffect(() => {
    if (wallet) {
      push('/');
    }
  }, [wallet, push]);

  const handlePrivateKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(signIn.request(privateKey));
  };

  const Footer = (
    <Button
      variant="rounded"
      disabled={privateKey === ''}
      onClick={handleSubmit}
    >
      Submit
    </Button>
  );

  return (
    <div className="row justify-content-center">
      <div className="col-sm-4 mt-5">
        <Card title="Login" footer={Footer} Icon={LoginIcon}>
          <InputGroup
            type="password"
            id="privateKey"
            value={privateKey}
            onChange={handlePrivateKeyChange}
            label="Private Key"
          />
        </Card>
      </div>
    </div>
  );
};
