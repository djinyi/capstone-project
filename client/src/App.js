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
import { UserContext } from "./user/UserContext";


function App() {
  const { user, setUser } = useContext(UserContext);
  const [loggingIn, setLoggingIn] = useState(false);

  console.log(user)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setLoggingIn(true)
      })
    }});

  }, [loggingIn, setUser]);

  return (
    <div>
      <Header />
      {!loggingIn ? (
        <main>
          <Welcome loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
        </main>
      ) : (
        <main>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/pets" element={<Pets />} /> 
            <Route path="/pets/:pets/contacts" element={<Contacts />} /> 
            <Route path="/checklist" element={<Checklist />} /> 
            <Route path="/profile" element={<Profile />} />  
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
