import React, { useState } from "react";
import Contact from "./Contact"

function Contacts({ listContacts, pets, deleteContact, createContact }){
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [relationship, setRelationship] = useState("");
    const [phone_number, setPhone_number] = useState(0);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState([]);
    const [pet_id, setPet_id] = useState(0)
    console.log(listContacts)

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {name, organization, relationship, phone_number, email, address, notes}
        console.log(formData)
        fetch(`/${pet_id}}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((newPost) => createContact(newPost))
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
          });

        setName("");
        setOrganization("");
        setPhone_number("");
    }


    let contactList = listContacts.map((contact) => (
        <Contact
        key = {contact.id}
        id = {contact.id}
        name = {contact.name}
        organization = {contact.organization}
        relationship = {contact.relationship}
        phone_number = {contact.phone_number}
        email = {contact.email}
        address = {contact.address}
        phoneNumber = {contact.phone_number}
        deleteContact={deleteContact}
        pet_id={pet_id}
        />
    ))

    let petsDropdown = pets.map((pet) => (
        <option value={pet.id}>{pet.name}</option>
    ))


    return(
        <div>
            {contactList}
        <h3> Enter new contact info! </h3>
        <p>
            {errors.map((err) => (
            <b key={err}>{err}! Must be logged in.</b>
            ))}
        </p>
        <form onSubmit={handleSubmit}>
            <label> name </label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <label> Organization </label>
            <input
            type="text"
            id="organization"
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            />
            <label> Relationship </label>
            <input
            type="text"
            id="relationship"
            value={relationship}
            onChange={e => setRelationship(e.target.value)}
            /> 
            <label> Address </label>
            <input
            type="text"
            id="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            /> 
            <label> Email </label>
            <input
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            /> 
            <label> Phone Number </label>
            <input
            type="text"
            id="phone_number"
            value={phone_number}
            onChange={e => setPhone_number(e.target.value)}
            /> 
            <label> Notes </label>
            <input
            type="text"
            id="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            /> 
            <label> Pet </label>
            <select onChange={e => setPet_id(e.target.value)} name="exhibit" id="exhibit">
                <option> </option>
                {petsDropdown}
            </select>
            <button type="submit"> Submit </button>
            </form>
            </div>
    )
}

export default Contacts;