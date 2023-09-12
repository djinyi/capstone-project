import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Welcome({ loggingIn, setLoggingIn}){
    const [showLogin, setShowLogin] = useState(true);
    return(
        <div>
            {showLogin ? (
                <>
                    <Login loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
                    <p>Don't have an account?</p>
                    <button onClick={() => setShowLogin(false)}>Sign Up</button>
                </>
            ) : (
                <>
                    <Signup loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
                    <p>Already have an account?
                    <button onClick={() => setShowLogin(true)}>Log In</button>
                    </p>
                </>
            )}
        </div>

    )
}

export default Welcome;