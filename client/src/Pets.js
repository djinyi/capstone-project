import React, { useContext, useState } from "react";
// import { UserContext } from "./user/UserContext";
import Pet from "./Pet"
import { PetContext } from "./pet/PetContext";

function Pets(){
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [medical_needs, setMedical_needs] = useState("");
    const [notes, setNotes] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const {pets, setPets} = useContext(PetContext);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = {name, breed, medical_needs, notes, description}
        console.log(formData)
        // if(!Number.isInteger(parseInt(birthday))){
        //     setErrors(["DOB must be must be 6 numbers, eg. 010100 for January 1st 2000"])
        // } else {
        fetch(`/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((newPet) => {
                    addNewPet(newPet)
                    setErrors([])
                })
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
          });

        setName("");
        setBreed("");
        setNotes("");
        setMedical_needs("");
        setDescription("");
        // }
        
    }

    function addNewPet(newPet){
        setPets([...pets, newPet])
      }
    
      function deletePet(id){
        let updatedPets = pets.filter((pet) => pet.id !== id)
        setPets(updatedPets)
      }

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

    let petList = pets?.map((pet) => (
        <Pet
        key = {pet.id}
        id = {pet.id}
        name = {pet.name}
        breed = {pet.breed}
        description = {pet.description}
        medical_needs = {pet.medical_needs}
        notes = {pet.notes}
        contacts = {pet.contacts}
        deletePet={deletePet}
        updatePets={updatePets}
        />
    ))

    
    return(
        <div className="grid grid-cols-1">
            <div className="block">
            <h1 className="font-display text-3xl italic text-sky-700 text-center p-4">My Pets</h1>
            </div>
            <div className="block">
            {petList}
            </div>
            <div className="mx-5">
            <p><b className="text-red-500">{errors?.map((err) => (
                <ul key={err}>{err}</ul>
                ))}</b></p>
            </div>
            <h3 className="font-semibold text-gray-600 mx-5"> Enter new pet info! </h3>
            <p class="mx-5 text-gray-400">*required fields</p>
            <form className="block w-full max-w-lg p-5" onSubmit={handleSubmit}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Name* </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Breed </label>
                <input
                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                
                type="text"
                id="breed"
                value={breed}
                onChange={e => setBreed(e.target.value)}
                />
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Description </label>
                <input
                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                
                type="text"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                /> 
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Medical Needs </label>
                <input
                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                
                type="text"
                id="medical_needs"
                value={medical_needs}
                onChange={e => setMedical_needs(e.target.value)}
                /> 
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Notes </label>
                <input
                 className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                
                type="text"
                id="description"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                /> 
                <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit"> Submit </button>
                </form>
        </div>
    )
}

export default Pets;