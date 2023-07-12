import React, { Component } from 'react';
import {
  ContactsForm,
  ContactsLabel,
  ContactName,
  ContactNumber,
  ContactInput,
  AddBtn,
} from './ContactFormStyled';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const contactData = {
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onAddContact(contactData);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <ContactsForm onSubmit={this.handleSubmit}>
        <ContactsLabel>
          <ContactName>Name</ContactName>
          <ContactInput
            value={this.state.name}
            onChange={this.onInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([\\' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </ContactsLabel>
        <ContactsLabel>
          <ContactNumber>Number</ContactNumber>
          <ContactInput
            value={this.state.number}
            onChange={this.onInputChange}
            type="text"
            name="number"
            pattern="\\+?\\d{1,4}?[-\\.\\s]?\\(\\d{1,3}\\)?[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,4}[-\\.\\s]?\\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </ContactsLabel>
        <AddBtn type="submit">Add contact</AddBtn>
      </ContactsForm>
    );
  }
}
