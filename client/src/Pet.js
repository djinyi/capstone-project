import React from "react";
import { Link } from "react-router-dom";

function Pet({ id, name, breed, medical_needs, notes, dob, description, contacts }){

    let birthdayString = dob.toString()
    let birthday = birthdayString.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");


    let listContacts = contacts.map((contact) => (
        <Link key={contact.id} to="/contacts">  Contacts: {contact.name} </Link>
    )) 


    return(
        <div>
            <p>Name: {name}</p>
            <p>Breed: {breed}</p>
            <p>Description: {description}</p>
            <p>Medical Needs: {medical_needs}</p>
            <p>Notes: {notes}</p>
            <p>Date of Birth: {birthday}</p>
            {listContacts}
    
        </div>

    )
}

export default Pet;