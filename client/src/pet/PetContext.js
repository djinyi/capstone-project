import React, { useEffect, useState } from "react";

const PetContext = React.createContext();

function PetProvider({ children }) {
    const [pets, setPets] = useState(null);

    useEffect(() => {
        fetch("/pets").then((r) => {
          if (r.ok) {
            r.json().then((data) => setPets(data));
          }
        });
      }, []);

  return <PetContext.Provider value={{pets, setPets}}>{children}</PetContext.Provider>;
}

export { PetContext, PetProvider }