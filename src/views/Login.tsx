import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, getWallet } from '../store/modules/wallet';
import { useLocation } from 'wouter';
import Card from '../components/Card';

export const SignIn = () => {
  const wallet = useSelector(getWallet);
  const dispatch = useDispatch();
  const [privateKey, setPrivateKey] = useState(
    '0x8540ac88767c07bf9d91cbe77ed1eb802832d5edc0a3e22e1af4fe3c5b6ef321',
  );
  const [, push] = useLocation();

  useEffect(() => {
    if (wallet) {
      push('/');
    }
  });

  const handlePrivateKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(signIn.request(privateKey));
  };

  const Footer = (
    <button
      type="button"
      className="button"
      disabled={privateKey === ''}
      onClick={handleSubmit}
    >
      Submit
    </button>
  );

  return (
    <div className="login">
      <Card title="Login" footer={Footer}>
        <div className="input-group">
          <input
            type="password"
            className="input"
            id="privateKey"
            value={privateKey}
            onChange={handlePrivateKeyChange}
          />
          <label className="input-label" htmlFor="privateKey">
            Private Key
          </label>
        </div>
      </Card>
    </div>
  );
};