import { useState } from "react";
import { nanoid } from 'nanoid'

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import ContactFilter from "./ContactFilter/ContactFilter";
import Container from "./Container/Container";
import useLocalStorage from "hooks/useLocalStorage";

export function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const formSubmit = ({ name, number }) => {
    const checkName = contacts.find(contact => contact.name === name);
    if (checkName) {
      alert(`${name} is already in contacts`);
      return contacts;
    }
    setContacts(prevState => {
      return [{ name, number, id: nanoid() }, ...prevState];
    })
  }

  const handleFilterChange = e => {
    setFilter(e.target.value);
  }

  const filterContactsName = value => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(value.toLowerCase())
    })
  }

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit = {formSubmit} />
      <h2>Contacts</h2>
      <ContactFilter
        title="Find contacts by name"
        value={filter}
        onChange={handleFilterChange} />
      <ContactList
        contactList={filterContactsName(filter)}
        onDeleted={deleteContact} />
    </Container>
  )
}
