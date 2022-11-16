import React, { useState, useEffect } from "react";
import s from './app.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter.jsx';
import ContactList from './ContactList/ContactList'
import { nanoid } from "nanoid";

const App = () => {
  const [contacts, setContacts] = useState(()=> JSON.parse(localStorage.getItem('cntcts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
   localStorage.setItem('cntcts', JSON.stringify(contacts))
  }, [contacts]);
  
  const addContact = (dataContact) => {
    const contact = {
      id: nanoid(),
      name: dataContact.name,
      number: dataContact.number
    }
    if (contacts.find(element =>
      element.name === dataContact.name)
    ) {
      alert(`${dataContact.name} is already in contacts`);
    } else {
      setContacts([contact, ...contacts]);
    }
  }

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter((el) => el.id !== id));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter))

  return (
    <>
      <div>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          addContact={addContact}
        />
        <h2 className={s.title}>Contacts</h2>
        <Filter
          onChange={changeFilter}
          value={filter}
        />
        <ContactList
          contacts={visibleContacts}
          deleteContact={deleteContact}
        />
      </div>
    </>
  );
};

export default App;