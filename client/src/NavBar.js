import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./user/UserContext";


function NavBar({ setLoggingIn } ) {
    const { setUser } = useContext(UserContext)

    function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null)
          setLoggingIn(false)
        }
      });
    }


    return (
        <div>
            <ul><NavLink exact to="/">
                <p>Home</p>
            </NavLink>
            </ul>
            <ul><NavLink exact to="/profile">
                <p >Profile</p>
            </NavLink></ul>
            <ul><NavLink exact to="/pets">
                <p>Pets</p>
            </NavLink></ul>
            <ul><NavLink exact to="/contacts">
                <p>Contacts</p>
            </NavLink>
            </ul>
            <ul><NavLink exact to="/checklist">
                <p>Checklist</p>
            </NavLink>
            </ul>
            <ul onClick={handleLogoutClick}><NavLink exact to="/logout">
                <p>Logout</p>
            </NavLink></ul>
        </div>
    )
}


export default NavBar;
