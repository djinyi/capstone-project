import React, { useState } from "react";

function UpdatePet({ updatePets, id, newName, setNewName, newNotes, setNewNotes, newMedical_needs, setNewMedical_needs, newBreed, setNewBreed, newDob, setNewDob, newDescription, setNewDescription }){
    const [errors, setErrors] = useState([]);

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
                    dob: newDob,
                    description: newDescription
                }),
            })
            .then((r) => {
            if(r.ok) {
                r.json().then((updated) => updatePets(updated, id));
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
            });
        }

    return(
        <div>
        <h3> Edit: </h3>
        <form onSubmit={handleSave}>
          <input
          name="textbox"
          value={newName}
          onChange={(e) => handleChange(e, setNewName)}
          showEditButton />
          <input
          name="textbox"
          value={newBreed}
          onChange={(e) => handleChange(e, setNewBreed)}
          showEditButton />
          <input
          name="textbox"
          value={newMedical_needs}
          onChange={(e) => handleChange(e, setNewMedical_needs)}
          showEditButton />
          <input
          name="textbox"
          value={newNotes}
          onChange={(e) => handleChange(e, setNewNotes)}
          showEditButton />
          <input
          name="textbox"
          value={newDob}
          onChange={(e) => handleChange(e, setNewDob)}
          showEditButton />
          <input
          name="textbox"
          value={newDescription}
          onChange={(e) => handleChange(e, setNewDescription)}
          showEditButton />
          <button> Submit Edit </button>
          </form>
          <p>
                <b>{errors}</b>
          </p>

        </div>
    )
}

export default UpdatePet;