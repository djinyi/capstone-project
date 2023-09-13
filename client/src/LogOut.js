import React, { useState } from "react";
import Home from "./Home";

function LogOut(){
    const [log, setLog] = useState(true)

    return(
        <div>
            <p>You've been logged out.</p>
            {log? <i onClick={() => setLog(log => !log)}>Want to log back in?</i>: <Home />}
        </div>
    )
}

export default LogOut;