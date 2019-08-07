import React, { useState } from 'react';
import { WithdrawForm } from './WithdrawForm';
import { Contacts } from './Contacts';
import { Contact } from '../../utils/addContact';

export const Withdraw = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectContact = (contact: Contact) => () => {
    setSelectedContact(contact);
  };

  return (
    <>
      <WithdrawForm selectedContact={selectedContact} />
      <Contacts handleSelectContact={handleSelectContact} />
    </>
  );
};
