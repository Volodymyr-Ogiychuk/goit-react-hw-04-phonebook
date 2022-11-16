import PropTypes from 'prop-types'
import React, { useState } from "react";
import s from './ContactForm.module.css'

const ContactForm = ({addContact}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        addContact({ name, number });
        setName('');
        setNumber('');   
    }

    const handleChange = event => {
        const { name, value } = event.target;
        switch (name) {
            case "name": 
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default: return;
        };

    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.label} >Name</label>
            <input className={s.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required
                value={name}
                onChange={handleChange}
            />
            <label className={s.label}>Number</label>
            <input
                className={s.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleChange}
            />
            <button className={s.btnSubmit} type="submit">Add contact</button>
        </form>
    );
    };

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};

export default ContactForm;

