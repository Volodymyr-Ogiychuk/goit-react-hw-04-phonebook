import React, { Component } from "react";
import s from './app.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter.jsx';
import ContactList from './ContactList/ContactList'
import { nanoid } from "nanoid";

class App extends Component {
 state = {
   contacts: [],
  filter: ''
  }
  
  componentDidMount() {

    if (localStorage.getItem('cntcts')) {this.state.contacts.length !== 0 ? this.setState({ contacts: [...this.state.contacts, ...JSON.parse(localStorage.getItem('cntcts'))] }) : this.setState({ contacts: [...JSON.parse(localStorage.getItem('cntcts'))] })
    } return this.state.contacts
  } 
  
  addContact = (dataContact) => {
    const contact = {
      id: nanoid(),
      name: dataContact.name,
      number: dataContact.number
    }
    if (this.state.contacts.find(element => 
      element.name === dataContact.name)
    ) {
      alert(`${dataContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts]
      }))
    }  
  }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  }

  deleteContact = (id) => {
    this.setState((prev) => ({ contacts: prev.contacts.filter((el) => el.id !== id) }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter))

    return (
      <>
        <div>
            <h1 className={s.title}>Phonebook</h1>
          <ContactForm
            contacts={this.state.contacts}
            addContact = {this.addContact}
          />
          <h2 className={s.title}>Contacts</h2>
          <Filter
            onChange={this.changeFilter}
            value={this.state.filter}
          />          
          <ContactList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </div>              
      </>
    );
  }
}

export default App;