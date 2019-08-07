export interface Contact {
  name: string;
  address: string;
}

export const addContact = (contact: Contact): void => {
  const contactsLocalStorage = window.localStorage.getItem('contacts');

  let newContacts: Contact[] | null;

  if (contactsLocalStorage) {
    const contactsArray: Contact[] = JSON.parse(contactsLocalStorage);
    const existingContact = contactsArray.find(
      c => c.address === contact.address,
    );

    if (existingContact) {
      newContacts = contactsArray.map(c => {
        if (c.address === contact.address) {
          return { ...c, name: contact.name };
        }

        return c;
      });
    } else {
      newContacts = [...contactsArray, contact];
    }
  } else {
    newContacts = [contact];
  }

  localStorage.setItem('contacts', JSON.stringify(newContacts));
};
