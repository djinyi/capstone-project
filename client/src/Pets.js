import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";
import Pet from "./Pet"

function Pets({ pets, addNewPet, deletePet }){
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [medical_needs, setMedical_needs] = useState("");
    const [notes, setNotes] = useState("");
    const [dob, setDob] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [images, setImages] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {name, breed, medical_needs, notes, dob, description, images}
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
                value={dob}
                onChange={e => setDob(e.target.value)}
                /> 

                <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setImages(e.target.files[0])} 
                />


                <button type="submit"> Submit </button>
                </form>
        </div>
    )
}

export default Pets;