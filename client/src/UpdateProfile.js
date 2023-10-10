import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";

function UpdateProfile({ id, dob, name, setName, username, setUsername, phone_number, setPhone_number, email, setEmail, address, setAddress }){
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
                name, username, phone_number, email, address, dob
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
          placeholder="Name"
          onChange={(e) => handleChange(e, setName)}
          showEditButton />
          <input
          name="textbox"
          value={username}
          placeholder="Username"
          onChange={(e) => handleChange(e, setUsername)}
          showEditButton />
          <input
          name="textbox"
          value={phone_number}
          placeholder="1231231234"
          onChange={(e) => handleChange(e, setPhone_number)}
          showEditButton />
          <input
          name="textbox"
          value={email}
          placeholder="email@email.com"
          onChange={(e) => handleChange(e, setEmail)}
          showEditButton />
          <input
          name="textbox"
          value={address}
          placeholder="Address"
          onChange={(e) => handleChange(e, setAddress)}
          showEditButton />
          <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded"> Submit</button>
          </form>
          <b class="text-red-500">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
          <b class="text-green-700">{message}</b>
          </div>
    )
}

export default UpdateProfile;