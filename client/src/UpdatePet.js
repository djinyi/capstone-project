import React, { useState } from "react";

function UpdatePet({ edit, setEdit, updatePets, id, newName, setNewName, newNotes, setNewNotes, newMedical_needs, setNewMedical_needs, newBreed, setNewBreed, newDescription, setNewDescription }){
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState([]);

    function handleChange(e, setFn) {
        setFn(e.target.value)
    }

    function handleSave(e){
    
        e.preventDefault();

        fetch(`/pets/${id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newName, 
            breed: newBreed, 
            medical_needs: newMedical_needs,
            notes: newNotes,
            description: newDescription
        }),
    })
    .then((r) => {
    if(r.ok) {
        r.json().then((updated) => {
            updatePets(updated, id)
            setErrors([])
            setMessage("Edit submitted.")
        });
    } else {
        r.json().then((err) => {
            setErrors(err.errors)
            setMessage([])
        });
    }
    });
}

    return(
        <div>
        <h3 className="text-center text-gray-400"> Edit: </h3>
        <form onSubmit={handleSave}>
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newName}
          placeholder="Name"
          onChange={(e) => handleChange(e, setNewName)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newBreed}
          placeholder="Breed"
          onChange={(e) => handleChange(e, setNewBreed)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newMedical_needs}
          placeholder="Medical needs"
          onChange={(e) => handleChange(e, setNewMedical_needs)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newNotes}
          placeholder="Notes"
          onChange={(e) => handleChange(e, setNewNotes)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newDescription}
          placeholder="Description"
          onChange={(e) => handleChange(e, setNewDescription)}
          showEditButton />
          <button onClick={() => setEdit(edit => !edit)} className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded"> Cancel </button>
          <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded"> Submit </button>
          </form>
          <p>
          <b className="text-red-500">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
          <b className="text-green-700">{message}</b>
          </p>

        </div>
    )
}

export default UpdatePet;