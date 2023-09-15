import React, { useContext, useState } from "react";
import { UserContext } from "./user/UserContext";
import UpdateProfile from "./UpdateProfile";


function Profile(){
    const { user } = useContext(UserContext);
    const [edit, setEdit] = useState(true);
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [phone_number, setPhone_number] = useState(user.phone_number)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)

    let phoneNumberString = phone_number.toString()
    let phoneNumber = phoneNumberString.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    let birthdayString = user.dob.toString()
    let birthday = birthdayString.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");

    return(
        <div>
        <p>Name: {name}  <i>({username})</i></p>
        <p>DOB: {birthday}</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Address: {address}</p>
        {edit? <button onClick={() => setEdit(edit => !edit)}> Edit</button> : <UpdateProfile id={user.id} name={name} setName={setName} email={email} setEmail={setEmail} phone_number={phone_number} setPhone_number={setPhone_number} username={username} setUsername = {setUsername} address={address} setAddress={setAddress} />}
        </div>
    )
}

export default Profile;