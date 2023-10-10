import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./user/UserContext";


function NavBar({ setLoggingIn }) {
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
        <nav class="flex flex-row items-center justify-center flex-wrap bg-white p-3">
            <ul class="float-left font-bold visited:bg-sky-600 mx-10"><NavLink exact to="/">
                <p class="p-3 font-bold text-sky-500 hover:bg-sky-100 p-3">Home</p>
            </NavLink>
            </ul>
            <ul class="float-left font-bold visited:bg-sky-600 mx-10"><NavLink exact to="/profile">
                <p class="p-3 text-sky-500 hover:bg-sky-100">Profile</p>
            </NavLink></ul>
            <ul class="float-left font-bold visited:bg-sky-600 mx-10"><NavLink exact to="/pets">
                <p class="p-3 text-sky-500 hover:bg-sky-100">Pets</p>
            </NavLink></ul>
            <ul class="float-left font-bold visited:bg-sky-600 mx-10"><NavLink exact to="/contacts">
                <p class="p-3 text-sky-500 hover:bg-sky-100">Contacts</p>
            </NavLink>
            </ul>
            <ul class="float-left font-bold visited:bg-sky-600 mx-10"><NavLink exact to="/checklist">
                <p class="p-3 text-sky-500 hover:bg-sky-100">Checklist</p>
            </NavLink>
            </ul>
            <ul class="float-left font-bold visited:bg-sky-600 mx-10" onClick={handleLogoutClick}><NavLink exact to="/logout">
                <p class="p-3 text-sky-500 hover:bg-sky-100">Logout</p>
            </NavLink></ul>
        </nav>
    )
}


export default NavBar;