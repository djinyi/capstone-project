import React, { useState } from "react";

const ContactContext = React.createContext();

function ContactProvider({ children }) {
    const [contacts, setContacts] = useState(null);

  return <ContactContext.Provider value={{contacts, setContacts}}>{children}</ContactContext.Provider>;
}

export { ContactContext, ContactProvider }