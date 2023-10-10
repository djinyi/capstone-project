import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./index.css"
import App from './App';
import { UserProvider } from "./user/UserContext";
import { BrowserRouter } from "react-router-dom";
import { PetProvider } from './pet/PetContext';

ReactDOM.render(
  <BrowserRouter>
    <PetProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </PetProvider>
  </BrowserRouter>,
  document.getElementById('root')
);



