import React, { useContext } from "react";
import { UserContext } from "./user/UserContext";
// import './input.css';

function Home(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <h1 className="text-center text-xl m-6">Welcome, <b>{user.name}</b>!</h1>
        </div>
    )
}

export default Home;