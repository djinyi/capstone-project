import React, { useState } from "react";
import { Link } from "react-router-dom";

function Pet({ id, name, breed, medical_needs, notes, dob, description, contacts }){
    const [errors, setErrors] = useState([]);

    function handleDeleteClick() {
        fetch(`/pets/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(console.log(id))
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
     })
    }

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
            <p>
            <button onClick={handleDeleteClick}> Delete </button>
            </p>
            
    
        </div>

    )
}

export default Pet;