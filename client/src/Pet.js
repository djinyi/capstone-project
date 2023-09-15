import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdatePet from "./UpdatePet";

function Pet({ id, name, breed, medical_needs, notes, dob, description, contacts }){
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState(true);
    const [newName, setNewName] = useState(name)
    const [newBreed, setNewBreed] = useState(breed)
    const [newMedical_needs, setNewMedical_needs] = useState(medical_needs)
    const [newNotes, setNewNotes] = useState(notes)
    const [newDob, setNewDob] = useState(dob)
    const [newDescription, setNewDescription] = useState(description)

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

    let birthdayString = newDob.toString()
    let birthday = birthdayString.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");


    let listContacts = contacts.map((contact) => (
        <Link key={contact.id} to="/contacts">  Contacts: {contact.newName} </Link>
    )) 


    return(
        <div>
            <p>Name: {newName}</p>
            <p>Breed: {newBreed}</p>
            <p>Description: {newDescription}</p>
            <p>Medical Needs: {newMedical_needs}</p>
            <p>Notes: {newNotes}</p>
            <p>Date of Birth: {birthday}</p>
            {listContacts}
            <p>
            {edit? <button onClick={() => setEdit(edit => !edit)}> Edit</button> : <UpdatePet id={id} newName={newName} setNewName={setNewName} newNotes={newNotes} setNewNotes={setNewNotes} newMedical_needs={newMedical_needs} setNewMedical_needs={setNewMedical_needs} newBreed={newBreed} setNewBreed = {setNewBreed} newDob={newDob} setNewDob={setNewDob} newDescription={newDescription} setNewDescription={setNewDescription} />}
            <button onClick={handleDeleteClick}> Delete </button>
            </p>
            
    
        </div>

    )
}

export default Pet;