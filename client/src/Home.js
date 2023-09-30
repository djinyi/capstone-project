import React, { useContext } from "react";
import { UserContext } from "./user/UserContext";
// import './input.css';

function Home(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <p>Welcome, <b>{user.name}</b>!</p>
            

            </div>
    )
}

export default Home;