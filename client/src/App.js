import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";
import Home from "./Home";
import Pets from "./Pets";
import Profile from "./Profile";
import Contacts from "./Contacts";
import Checklist from "./Checklist";
import Welcome from "./Welcome";
import LogOut from "./LogOut";
import { UserContext } from "./user/UserContext";
import { PetContext } from "./pet/PetContext";


function App() {
  const { user, setUser } = useContext(UserContext);
  const {pets, setPets} = useContext(PetContext);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setLoggingIn(true)
      })
    }});

  }, [loggingIn, setUser]);

  useEffect(() => {
    fetch("/pets").then((r) => {
      if (r.ok) {
        r.json().then((data) => setPets(data));
      }
    });
  }, [loggingIn, setPets]);

  function createContact(newContact, pet_id){

    let updatedPets = [...pets].map((pet) => {
      if(pet.id == pet_id){
        let newContacts = [...pet.contacts, newContact]
        let updatedPet = {...pet, contacts: newContacts}
        return updatedPet 
      }
      return pet
    })
    setPets(updatedPets)
  }

  function deleteContact(id){
    
    let updatedContact = [...pets].map((pet) => {

      let thePet = pet.contacts.map((contact) => {
        if(contact.id !== id){
          let newContact = {...contact, pet_id:pet.id}
          return newContact
        }

        return contact})
        let thie = pet.contacts.filter((contact) => contact.id !== id)
        let thies = {...pet, contacts:thie}

      return thies
    })
    setPets(updatedContact)
  }


  let listContacts = pets?.map((pet) => pet.contacts).flat()


  return (
    <div className="font-serif">
      <Header />
      {!user ? (
        <main>
          <Welcome loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
        </main>
      ) : (
        <main>
          <NavBar setLoggingIn={setLoggingIn} />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/pets" element={<Pets />} /> 
            <Route path="/contacts" element={<Contacts deleteContact={deleteContact} createContact={createContact} listContacts={listContacts}/>} /> 
            <Route path="/checklist" element={<Checklist />} /> 
            <Route path="/profile" element={<Profile />} />  
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
