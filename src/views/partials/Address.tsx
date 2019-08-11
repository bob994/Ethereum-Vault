import React from 'react';
import { useSelector } from 'react-redux';
import Clipboard from 'clipboard';

import Card from '../../components/Card';

import CopyIcon from '../../assets/icons/copy.svg';
import { getWallet } from '../../store/modules/wallet';

export const Address = () => {
  const wallet = useSelector(getWallet)!;
  const { address } = wallet;

  new Clipboard('#address');

  return (
    <Card title="Address" icon={CopyIcon}>
      <div className="address-content">
        <input
          type="text"
          className="input"
          id="address"
          value={address}
          disabled
          data-clipboard-text={address}
        />
        <img
          className="address-qr"
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
        />
      </div>
    </Card>
  );
};
