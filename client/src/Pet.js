import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdatePet from "./UpdatePet";
import PetGallerySubmit from "./PetGallerySubmit";

function Pet({ updatePets, id, name, breed, medical_needs, notes, dob, description, contacts, deletePet, images }){
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState(true);
    const [newName, setNewName] = useState(name)
    const [newBreed, setNewBreed] = useState(breed)
    const [newMedical_needs, setNewMedical_needs] = useState(medical_needs)
    const [newNotes, setNewNotes] = useState(notes)
    const [newDob, setNewDob] = useState(dob)
    const [newDescription, setNewDescription] = useState(description)
    const [photos, setPhotos] = useState(images)

    function handleDeleteClick() {
        fetch(`/pets/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if(r.ok) {
                r.json().then(deletePet(id))
            } else {
                r.json().then((error) => setErrors(error.errors));
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
            {edit? <button onClick={() => setEdit(edit => !edit)}> Edit</button> : <UpdatePet updatePets={updatePets} id={id} newName={newName} setNewName={setNewName} newNotes={newNotes} setNewNotes={setNewNotes} newMedical_needs={newMedical_needs} setNewMedical_needs={setNewMedical_needs} newBreed={newBreed} setNewBreed = {setNewBreed} newDob={newDob} setNewDob={setNewDob} newDescription={newDescription} setNewDescription={setNewDescription} />}
            <button onClick={handleDeleteClick}> Delete </button>
            </p>
            <p></p>
            {errors.map((error) => (
             <p key={error}>{error}</p>
            ))
            }
            <PetGallerySubmit id={id} setPhotos={setPhotos} />
            {photos? (photos.map ((photo, index) => (
            <div key={index}>
            <button onClick={() =>
              setPhotos((photos) => {
              return photos.filter((photo, i) => i !== index);
            })}>x</button>
            <img height="150px" src={photo} alt=" "/> </div>))) :

            <img height="300px" src="https://i.imgur.com/GekBpGO.jpg" alt=" "/>
            }
    
        </div>

    )
}

export default Pet;