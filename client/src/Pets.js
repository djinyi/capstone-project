import React, { useState } from "react";
// import { UserContext } from "./user/UserContext";
import Pet from "./Pet"

function Pets({ setPets, pets, addNewPet, deletePet }){
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [medical_needs, setMedical_needs] = useState("");
    const [notes, setNotes] = useState("");
    const [dob, setDob] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {name, breed, medical_needs, notes, dob, description}
        console.log(formData)
        fetch(`/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((newPet) => addNewPet(newPet))
            } else {
                r.json().then((err) => setErrors(err.error));
            }
          });

        setName("");
        setBreed("");
        setNotes("");
        setMedical_needs("");
        setDob("");
        setDescription("");
    }

    console.log(pets)

    function updatePets(data, id){
        console.log(data, id)

        let list = pets.map((pet) => {
            if(pet.id === id){
                return {...pet, ...data}
            }
            return pet
        })
        setPets(list)
    }

    let petList = pets.map((pet) => (
        <Pet
        key = {pet.id}
        id = {pet.id}
        name = {pet.name}
        breed = {pet.breed}
        description = {pet.description}
        dob = {pet.dob}
        medical_needs = {pet.medical_needs}
        notes = {pet.notes}
        contacts = {pet.contacts}
        deletePet={deletePet}
        images={pet.image_urls}
        updatePets={updatePets}
        />
    ))

    
    return(
        <div>
            <h3>My Pets</h3>
            {petList}
            <h3> Enter new pet info! </h3>
            <p><b>
                {errors}
            </b></p>
            <form onSubmit={handleSubmit}>
                <label> Name </label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <label> Breed </label>
                <input
                type="text"
                id="breed"
                value={breed}
                onChange={e => setBreed(e.target.value)}
                />
                <label> Description </label>
                <input
                type="text"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                /> 
                <label> Medical Needs </label>
                <input
                type="text"
                id="medical_needs"
                value={medical_needs}
                onChange={e => setMedical_needs(e.target.value)}
                /> 
                <label> Notes </label>
                <input
                type="text"
                id="description"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                /> 
                <label> DoB </label>
                <input
                type="text"
                id="dob"
                placeholder="MMDDYY"
                value={dob}
                onChange={e => setDob(e.target.value)}
                /> 
                <button type="submit"> Submit </button>
                </form>
        </div>
    )
}

export default Pets;