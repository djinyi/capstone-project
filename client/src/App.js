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
import { ContactContext } from "./contact/ContactContext";


function App() {
  const { user, setUser } = useContext(UserContext);
  const {setPets} = useContext(PetContext);
  const {setContacts} = useContext(ContactContext);
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

  useEffect(() => {
    fetch("/contacts").then((r) => {
      if (r.ok) {
        r.json().then((data) => setContacts(data));
      }
    });
  }, [loggingIn, setContacts]);

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
            <Route path="/contacts" element={<Contacts />} /> 
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
