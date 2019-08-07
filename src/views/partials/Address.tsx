import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../../components/Card';

import CopyIcon from '../../assets/icons/copy.svg';
import { getWallet } from '../../store/modules/wallet';

export const Address = () => {
  const wallet = useSelector(getWallet)!;

  return (
    <Card title="Address" icon={CopyIcon}>
      <div className="address-content">
        {wallet.address}
        <img
          className="address-qr"
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
            wallet.address
          }`}
        />
      </div>
    </Card>
  );
};
