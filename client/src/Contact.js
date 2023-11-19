import React, { useState } from "react";
import UpdateContact from "./UpdateContact";

function Contact({ updateContacts, deleteContact, id, name, organization, relationship, phoneNumber, email, address, notes }){
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState(true);
    const [newName, setNewName] = useState(name)
    const [newOrganization, setNewOrganization] = useState(organization)
    const [newRelationship, setNewRelationship] = useState(relationship)
    const [newPhone_number, setNewPhone_number] = useState(phoneNumber)
    const [newNotes, setNewNotes] = useState(notes)
    const [newEmail, setNewEmail] = useState(email)
    const [newAddress, setNewAddress] = useState(address)
    
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

    let phoneNumberString = newPhone_number?.toString().padStart(10, "0")
    let phone_number = phoneNumberString?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    return(
        <div className="flex flex-col justify-center items-center p-4">
            <p>Name: {newName}</p>
            <p>Organization: {newOrganization}</p>
            <p>Relationship: {newRelationship}</p>
            <p>Phone Number: {phone_number}</p>
            <p>Email: {newEmail}</p>
            <p>Address: {newAddress}</p>
            <p>Notes: {newNotes}</p>
            {edit? 
            <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" onClick={() => setEdit(edit => !edit)}> Edit</button> 
            : 
            <UpdateContact updateContacts={updateContacts} id={id} newName={newName} setNewName={setNewName} newOrganization={newOrganization} setNewOrganization={setNewOrganization} newPhone_number={newPhone_number} setNewPhone_number={setNewPhone_number} newRelationship={newRelationship} setNewRelationship={setNewRelationship} newAddress={newAddress} setNewAddress={setNewAddress} newEmail={newEmail} setNewEmail={setNewEmail} newNotes={newNotes} setNewNotes={setNewNotes} edit={edit} setEdit={setEdit} />}
            <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" onClick={() => handleDeleteClick()}> Delete </button>
            <p>{errors}</p>
        </div>
    )
}

export default Contact;