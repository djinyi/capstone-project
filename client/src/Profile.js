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

    let phoneNumberString = phone_number.toString().padStart(10, "0")
    let phoneNumber = phoneNumberString.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    let birthdayString = user.dob.toString().padStart(6, "0")
    let birthday = birthdayString.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");

    return(
        <div>
            <h1 class="text-3xl text-sky-500 text-center p-4">My Profile</h1>
        <p><i>Name:</i> {name}  (<b><i>{username}</i></b>)</p>
        <p><i>DOB:</i> {birthday}</p>
        <p><i>Email:</i> {email}</p>
        <p><i>Phone Number:</i> {phoneNumber}</p>
        <p><i>Address:</i> {address}</p>
        {edit? <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" onClick={() => setEdit(edit => !edit)}> Edit</button> : <UpdateProfile id={user.id} name={name} setName={setName} email={email} setEmail={setEmail} phone_number={phone_number} setPhone_number={setPhone_number} username={username} setUsername = {setUsername} address={address} setAddress={setAddress} />}
        </div>
    )
}

export default Profile;