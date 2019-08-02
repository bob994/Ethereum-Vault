import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, getWallet } from '../modules/wallet';
import { useLocation } from 'wouter';

export const SignIn = () => {
  const wallet = useSelector(getWallet);
  const dispatch = useDispatch();
  const [privateKey, setPrivateKey] = useState('');
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

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">Login</div>
      </div>
      <div className="card-content">
        <div className="field">
          <label className="label" htmlFor="address">
            Private key
          </label>
          <input
            type="password"
            className="input"
            id="address"
            value={privateKey}
            onChange={handlePrivateKeyChange}
          />
        </div>
        <button
          type="button"
          className="button is-primary is-fullwidth"
          disabled={privateKey === ''}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
