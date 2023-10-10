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
    const [newDob, setNewDob] = useState(parseInt(dob))
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

    let birthdayString = newDob?.toString().padStart(6, "0")
    let birthday = birthdayString?.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");

    return(
        <div class="p-6">
            <p><i>Name: </i> <b class="font-semi-bold">{newName}</b></p>
            <p><i>Breed: </i>{newBreed}</p>
            <p><i>Description: </i>{newDescription}</p>
            <p><i>Medical Needs: </i>{newMedical_needs}</p>
            <p><i>Notes: </i>{newNotes}</p>
            <p><i>Date of Birth: </i>{birthday}</p>
            <p>
            {edit? <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" onClick={() => setEdit(edit => !edit)}> Edit</button> : <UpdatePet updatePets={updatePets} id={id} newName={newName} setNewName={setNewName} newNotes={newNotes} setNewNotes={setNewNotes} newMedical_needs={newMedical_needs} setNewMedical_needs={setNewMedical_needs} newBreed={newBreed} setNewBreed = {setNewBreed} newDescription={newDescription} setNewDescription={setNewDescription} />}
            <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 my-2 rounded" onClick={handleDeleteClick}> Delete </button>
            </p>
            <p></p>
            <b class="text-red-500">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
            <PetGallerySubmit id={id} setPhotos={setPhotos} />
            {photos? (photos.map ((photo, index) => (
            <div key={index}>
            <button onClick={() =>
              setPhotos((photos) => {
              return photos.filter((photo, i) => i !== index);
            })}>x</button>
            <img class="h-64" src={photo} alt=" "/> </div>))) :

            <img class="h-64" src="https://i.imgur.com/GekBpGO.jpg" alt=" "/>
            }
    
        </div>

    )
}

export default Pet;