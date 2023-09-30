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
        <nav class="flex justify-center space-x-4">
            <ul class="float-left font-bold bg-sky-400 hover:bg-sky-600 visited:bg-sky-600 rounded-tl-lg rounded-bl-lg"><NavLink exact to="/">
                <p class="p-8 text-white drop-shadow-2xl">Home</p>
            </NavLink>
            </ul>
            <ul class="float-left font-bold bg-sky-400 hover:bg-sky-600 visited:bg-sky-600"><NavLink exact to="/profile">
                <p class="p-8 text-white drop-shadow-2xl">Profile</p>
            </NavLink></ul>
            <ul class="float-left font-bold bg-sky-400 hover:bg-sky-600 visited:bg-sky-600"><NavLink exact to="/pets">
                <p class="p-8 text-white drop-shadow-2xl">Pets</p>
            </NavLink></ul>
            <ul class="float-left font-bold bg-sky-400 hover:bg-sky-600 visited:bg-sky-600"><NavLink exact to="/contacts">
                <p class="p-8 text-white drop-shadow-2xl">Contacts</p>
            </NavLink>
            </ul>
            <ul class="float-left font-bold bg-sky-400 hover:bg-sky-600 visited:bg-sky-600"><NavLink exact to="/checklist">
                <p class="p-8 text-white drop-shadow-2xl">Checklist</p>
            </NavLink>
            </ul>
            <ul  class="float-left font-bold bg-sky-400 hover:bg-sky-600 visited:bg-sky-600 rounded-br-lg rounded-tr-lg" onClick={handleLogoutClick}><NavLink exact to="/logout">
                <p class="p-8 text-white drop-shadow-2xl">Logout</p>
            </NavLink></ul>
        </nav>
    )
}


export default NavBar;