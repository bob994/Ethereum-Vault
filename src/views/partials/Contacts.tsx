import React from 'react';
import Card from '../../components/Card';
import { Contact } from '../../utils/addContact';
import { ReactComponent as ContactsIcon } from '../../assets/icons/network.svg';

export const Contacts = ({ handleSelectContact }: any) => {
  const contacts: Contact[] = JSON.parse(
    window.localStorage.getItem('contacts') || '[]',
  );

  const List =
    contacts.length > 0
      ? contacts.map(c => (
          <li
            className="contacts-list-item"
            key={c.address}
            onClick={handleSelectContact(c)}
          >
            {c.name}
          </li>
        ))
      : 'Create new transaction to add contact';

  return (
    <Card title="Contacts" Icon={ContactsIcon}>
      <div className="contacts">
        <ul className="contacts-list">{List}</ul>
      </div>
    </Card>
  );
};
