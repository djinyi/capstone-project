import React, { useState } from "react";

function UpdateProfile({ id, name, setName, username, setUsername, phone_number, setPhone_number, email, setEmail, address, setAddress }){
    const [errors, setErrors] = useState([]);

    function handleChange(e, setFn) {
        setFn(e.target.value)
      }
      
    function handleSave(e){
    
    e.preventDefault();
    
            fetch(`/users/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, username, phone_number, email, address
            }),
        })
        .then((r) => {
        if(r.ok) {
            r.json().then((updated) => console.log(updated, id));
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
          value={name}
          onChange={(e) => handleChange(e, setName)}
          showEditButton />
          <input
          name="textbox"
          value={username}
          onChange={(e) => handleChange(e, setUsername)}
          showEditButton />
          <input
          name="textbox"
          value={phone_number}
          onChange={(e) => handleChange(e, setPhone_number)}
          showEditButton />
          <input
          name="textbox"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          showEditButton />
          <input
          name="textbox"
          value={address}
          onChange={(e) => handleChange(e, setAddress)}
          showEditButton />
          <button> Submit </button>
          </form>
          <p>
                <b>{errors}</b>
          </p>
          </div>
    )
}

export default UpdateProfile;