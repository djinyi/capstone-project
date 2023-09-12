import React from "react";
import { NavLink } from "react-router-dom";


function NavBar( ) {



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
        </div>
    )
}


export default NavBar;
