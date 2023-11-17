import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Welcome({ loggingIn, setLoggingIn}){
    const [showLogin, setShowLogin] = useState(true);
    return(
        <div>
            {showLogin ? (
                <div className="flex flex-col justify-center items-center">
                    <Login loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
                    <p>Don't have an account?
                    <button className="italic m-1" onClick={() => setShowLogin(false)}>Sign Up</button>
                    </p>
                </div>
            ) : (
                <div className="mx-5">
                    <Signup loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
                    <p className="mx-5">Already have an account? 
                    <button className="italic m-1" onClick={() => setShowLogin(true)}>Log In</button>
                    </p>
                </div>
            )}
        </div>

    )
}

export default Welcome;