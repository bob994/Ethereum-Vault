import React from 'react';
import { useSelector } from 'react-redux';
import Clipboard from 'clipboard';

import Card from '../../components/Card';

import { ReactComponent as AddressIcon } from '../../assets/icons/wallet.svg';
import { getWallet } from '../../store/modules/wallet';
import { toast } from 'react-toastify';

export const Address = () => {
  const wallet = useSelector(getWallet)!;
  const { address } = wallet;

  new Clipboard('#address');

  const handleOnClick = () => {
    toast.info('Address copied to clipboard.');
  };

  return (
    <Card title="Address" Icon={AddressIcon}>
      <div className="address-content">
        <input
          type="text"
          className="input"
          id="address"
          value={address}
          readOnly
          data-clipboard-text={address}
          onClick={handleOnClick}
        />
        <img
          className="address-qr"
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
          alt="Address QR Code"
        />
      </div>
    </Card>
  );
};
