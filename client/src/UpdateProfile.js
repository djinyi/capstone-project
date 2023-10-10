import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";

function UpdateProfile({ id, name, setName, username, setUsername, phone_number, setPhone_number, email, setEmail, address, setAddress }){
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState([]);
    const { user, setUser } = useContext(UserContext);
    
    console.log(user)

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
            r.json().then((updated) => {
                setUser(updated)
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
          <button> Submit Edit</button>
          </form>
          <b class="text-red-500">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
          <b class="text-green-700">{message}</b>
          </div>
    )
}

export default UpdateProfile;