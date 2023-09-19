import React, { useState } from "react";

function Contacts({ deleteContact, id, name, organization, relationship, phoneNumber, email, address, notes, pet_id }){
    const [errors, setErrors] = useState([]);

    function handleDeleteClick() {
        fetch(`/contacts/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(deleteContact(id, pet_id))
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
     })
    }

    let phoneNumberString = phoneNumber.toString()
    let phone_number = phoneNumberString.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    return(
        <div>
            <p>Name: {name}</p>
            <p>Organization: {organization}</p>
            <p>Relationship: {relationship}</p>
            <p>Phone Number: {phone_number}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Notes: {notes}</p>
            <button onClick={() => handleDeleteClick()}> Delete </button>
            <p>{errors}</p>
        </div>
    )
}

export default Contacts;