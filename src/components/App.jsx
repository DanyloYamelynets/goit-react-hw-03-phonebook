import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import {
  Container,
  PhonebookTitle,
  ContactsTitle,
} from './Container/ContainerStyled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts =
      JSON.parse(stringifiedContacts) || this.state.contacts;
    this.setState({ contacts: parsedContacts });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  onAddContact = contactData => {
    const { name } = contactData;
    const checkName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(),
        ...contactData,
      };
      this.setState({ contacts: [contact, ...this.state.contacts] });
    }
  };
  onFilter = filterContacts => {
    this.setState({ filter: filterContacts });
  };
  onDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };
  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );

    return (
      <Container>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm onAddContact={this.onAddContact} />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter
          filter={this.state.filter}
          onFilter={this.onFilter}
          title="Find contacts by name"
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </Container>
    );
  }
}
