import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdatePet from "./UpdatePet";
import PetGallerySubmit from "./PetGallerySubmit";

function Pet({ dob, updatePets, id, name, breed, medical_needs, notes, description, deletePet }){
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState(true);
    const [newName, setNewName] = useState(name)
    const [newBreed, setNewBreed] = useState(breed)
    const [newMedical_needs, setNewMedical_needs] = useState(medical_needs)
    const [newNotes, setNewNotes] = useState(notes)
    const [newDescription, setNewDescription] = useState(description)

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

    if(dob !== null){
        let dobString = new Date(dob)
        dobString.setDate(dobString.getDate() + 1)
        dob = dobString?.toLocaleDateString("en-US")
    } 

    return(
        <div className="p-6">
            <p><i>Name: </i> <b className="font-semi-bold">{newName}</b></p>
            <p><i>Breed: </i>{newBreed}</p>
            <p><i>DoB: </i>{dob}</p>
            <p><i>Description: </i>{newDescription}</p>
            <p><i>Medical Needs: </i>{newMedical_needs}</p>
            <p><i>Notes: </i>{newNotes}</p>
            <p>
            {edit? <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" onClick={() => setEdit(edit => !edit)}> Edit</button> : <UpdatePet edit={edit} setEdit={setEdit} updatePets={updatePets} id={id} newName={newName} setNewName={setNewName} newNotes={newNotes} setNewNotes={setNewNotes} newMedical_needs={newMedical_needs} setNewMedical_needs={setNewMedical_needs} newBreed={newBreed} setNewBreed = {setNewBreed} newDescription={newDescription} setNewDescription={setNewDescription} />}
            <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 my-2 rounded" onClick={handleDeleteClick}> Delete </button>
            </p>
            <p></p>
            <b className="text-red-500">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
            <PetGallerySubmit id={id}/>
        </div>
    )
}

export default Pet;