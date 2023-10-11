import React, { useContext } from "react";
import { UserContext } from "./user/UserContext";
// import './input.css';

function Home(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <h1 className="text-center text-xl m-6">Welcome, <b>{user.name}</b>!</h1>
        <div className="bg-gray-100 p-5">
            <div className="text-left mx-20">
            <img className="object-contain float-right border-2 border-sky-100 h-64 mx-8 my-5" src="https://i.imgur.com/tUIojHS.png" />
            <p className="my-6">Here are a few things you can do in preparation of man made and natural disasters!</p>
            <p className="my-6">Create a list of your pets and include as much information about them. This is so in the event of being separated from your pets, you have proper ID to claim them as well as crucial information like medicaal needs and details you must keep in mind.</p>
            <p className="my-6">Compile your list of contacts! We recommend collecting the contact information of your veternarians, designated fosters, petsitters, breeders, neighbors, and your local pet shelters. </p>
            <p className="my-6">Curate your own checklist for your to-dos depending on your personal situation. Consider your location, the number and types of animals you have, and the type of disaster.</p>
            </div>
            </div>
        </div>
    )
}

export default Home;