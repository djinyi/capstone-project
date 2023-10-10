import React, { useState } from "react";

function Contacts({ deleteContact, id, name, organization, relationship, phoneNumber, email, address, notes }){
    const [errors, setErrors] = useState([]);

    function handleDeleteClick() {
        fetch(`/contacts/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(deleteContact(id))
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
     })
    }

    let phoneNumberString = phoneNumber?.toString().padStart(10, "0")
    let phone_number = phoneNumberString?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    return(
        <div className="p-4">
            <p>Name: {name}</p>
            <p>Organization: {organization}</p>
            <p>Relationship: {relationship}</p>
            <p>Phone Number: {phone_number}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Notes: {notes}</p>
            <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" onClick={() => handleDeleteClick()}> Delete </button>
            <p>{errors}</p>
        </div>
    )
}

export default Contacts;