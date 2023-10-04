import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./index.css"
import App from './App';
import { UserProvider } from "./user/UserContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);



