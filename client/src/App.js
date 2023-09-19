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


function App() {
  const { user, setUser } = useContext(UserContext);
  const [loggingIn, setLoggingIn] = useState(false);
  const [pets, setPets] = useState([]);


  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setLoggingIn(true)
          fetchPets()
      })
    }});

  }, [loggingIn, setUser]);

  function fetchPets(){
    fetch("/pets")
      .then((r) => r.json())
      .then((r) => setPets(r));
  };

  function addNewPet(newPet){
    setPets([...pets, newPet])
  }

  function deletePet(id){
    let updatedPets = pets.filter((pet) => pet.id !== id)
    setPets(updatedPets)
  }

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

    // let updatedPets = pets.map((pet) => {
    //   if(pet.id == pet_id){
    //     let updatedContacts = pet.contacts.filter((contact) => contact.id !== id)
    //     let updatedPet = {...pet, contacts: updatedContacts}
    //     return updatedPet;
    //     debugger
    //   }
    //   return pet;
    //   debugger
    // })
    // setPets(updatedPets)
    // debugger

  // }


  let listContacts = pets.map((pet) => pet.contacts).flat()


  return (
    <div>
      <Header />
      {!loggingIn ? (
        <main>
          <Welcome loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
        </main>
      ) : (
        <main>
          <NavBar setLoggingIn={setLoggingIn} />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/pets" element={<Pets pets={pets} addNewPet={addNewPet} deletePet={deletePet} />} /> 
            <Route path="/contacts" element={<Contacts deleteContact={deleteContact} createContact={createContact} listContacts={listContacts} pets={pets}/>} /> 
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
