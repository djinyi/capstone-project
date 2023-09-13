import React from "react";

function Contacts({ id, name, organization, relationship, phoneNumber, email, address, notes }){


    return(
        <div>
            <p>Name: {name}</p>
            <p>Organization: {organization}</p>
            <p>Relationship: {relationship}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Notes: {notes}</p>

        </div>
    )
}

export default Contacts;