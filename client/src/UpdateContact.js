import React, { useState } from "react";

function UpdateContact({edit, setEdit, updateContacts, id, newName, setNewName, newOrganization, setNewOrganization, newRelationship, setNewRelationship, newPhone_number, setNewPhone_number, newNotes, setNewNotes, newEmail, setNewEmail, newAddress, setNewAddress}){
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState([]);

    function handleChange(e, setFn) {
        setFn(e.target.value)
    }

    function handleEdit(e){
        e.preventDefault();

        fetch(`/contacts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                organization: newOrganization,
                relationship: newRelationship,
                phone_number: newPhone_number,
                address: newAddress,
                email: newEmail,
                notes: newNotes
            }),
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((updated) => {
                    updateContacts(updated)
                    setErrors([])
                    setMessage("Edit submitted.")
                });
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                    setMessage([])
                });
            }
        })
    }

    return(
        <div>
        <h3 className="text-center text-gray-400"> Edit: </h3>
        <form onSubmit={handleEdit}>
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
          value={newOrganization}
          placeholder="Organization"
          onChange={(e) => handleChange(e, setNewOrganization)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newPhone_number}
          placeholder="Phone number"
          onChange={(e) => handleChange(e, setNewPhone_number)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newAddress}
          placeholder="Address"
          onChange={(e) => handleChange(e, setNewAddress)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newEmail}
          placeholder="Email"
          onChange={(e) => handleChange(e, setNewEmail)}
          showEditButton />
          <input
          className="bg-gray-100 m-1"
          name="textbox"
          value={newNotes}
          placeholder="Notes"
          onChange={(e) => handleChange(e, setNewNotes)}
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

export default UpdateContact;