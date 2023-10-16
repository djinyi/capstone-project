import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./index.css"
import App from './App';
import { UserProvider } from "./user/UserContext";
import { BrowserRouter } from "react-router-dom";
import { PetProvider } from './pet/PetContext';
import { ContactProvider } from './contact/ContactContext';

ReactDOM.render(
  <BrowserRouter>
    <ContactProvider>
    <PetProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </PetProvider>
    </ContactProvider>
  </BrowserRouter>,
  document.getElementById('root')
);



