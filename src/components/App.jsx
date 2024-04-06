import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './App.scss';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.name;
    this.setState(prev => ({
      ...prev,
      contacts: [{ id: nanoid(), name: value }, ...prev.contacts],
    }));
    this.setState({ name: '' });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { name, contacts } = this.state;
    console.log(contacts);

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
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <button type="submit">Add contact</button>
        </form>

        <h2>Contacts:</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
