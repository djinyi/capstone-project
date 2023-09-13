import React, { useContext } from "react";
import { UserContext } from "./user/UserContext";


function Profile(){
    const { user } = useContext(UserContext);

    let phoneNumberString = user.phone_number.toString()
    let phoneNumber = phoneNumberString.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    let birthdayString = user.dob.toString()
    let birthday = birthdayString.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");

    return(
        <div>
        <p>Name: {user.name}  <i>({user.username})</i></p>
        <p>DOB: {birthday}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Address: {user.address}</p>
        </div>
    )
}

export default Profile;