import React, { useState } from "react";

function Contacts({ id, name, organization, relationship, phoneNumber, email, address, notes }){
    const [errors, setErrors] = useState([]);

    function handleDeleteClick() {
        fetch(`/contacts/${id}`, {
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


    return(
        <div>
            <p>Name: {name}</p>
            <p>Organization: {organization}</p>
            <p>Relationship: {relationship}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Notes: {notes}</p>
            <button onClick={handleDeleteClick}> Delete </button>
        </div>
    )
}

export default Contacts;