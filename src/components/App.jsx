import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './App.scss';
import testData from './Data/testData.json';
import { ReactComponent as Search } from './Icons/Search.svg';

export class App extends Component {
  state = {
    contacts: [...testData],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.elements);
    const { name, number } = this.state;
    this.setState(prev => ({
      ...prev,
      contacts: [{ id: nanoid(), name, number }, ...prev.contacts],
    }));
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  filteredContacts = contacts => {
    const { filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { name, number, contacts, filter } = this.state;
    return (
      <div className="container">
        <h1>Phonebook:</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number">Name</label>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add contact</button>
        </form>

        <h2>Contacts:</h2>
        <div className="filter">
          <label htmlFor="filter"></label>
          <input
            type="text"
            name="filter"
            value={filter}
            onChange={this.handleChange}
          />
          <Search />
        </div>
        <ul>
          {this.filteredContacts(contacts).map(contact => (
            <li key={contact.id}>{`${contact.name}: ${contact.number}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}
