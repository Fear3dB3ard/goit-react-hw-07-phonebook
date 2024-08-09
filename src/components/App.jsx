

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';
import { fetchContacts, addContact, deleteContact, setFilter } from '../redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    
    if (isDuplicate) {
      alert(`Contact with name "${name}" already exists! Please use a different name.`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.App}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
