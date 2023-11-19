import React, { useContext } from "react";
import { UserContext } from "./user/UserContext";
import { Link } from "react-router-dom";
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
            <Link className="text-xl text-sky-700 text-center underline" to="/pets">My Pets</Link>
            <p className="my-6">Create a roster of your pets. Fill out as much information about them and include pictures. This is so that in the event of being separated from your pets, you have proper ID to claim them as well as crucial information like their medical needs, diet, and feeding schedules.</p>
            <Link className="text-xl text-sky-700 text-center underline" to="/contacts">My Contacts</Link>
            <p className="my-6">Build your contacts. We recommend collecting the contact information of your veterinarians, designated fosters, petsitters, breeders, neighbors, and your local pet shelters. </p>
            <Link as="button"className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" to="/checklist">My Checklist</Link>
            <p className="my-6">Curate your own checklist for your to-dos depending on your personal situation. Consider your geographical location, the number and types of animals you have, and the type of disaster. Check out our list of resources from ASPCA, Red Cross, and more.</p>
            </div>
            </div>
        </div>
    )
}

export default Home;