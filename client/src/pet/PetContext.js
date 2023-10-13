import React, { useEffect, useState } from "react";

const PetContext = React.createContext();

function PetProvider({ children }) {
    const [pets, setPets] = useState(null);

  return <PetContext.Provider value={{pets, setPets}}>{children}</PetContext.Provider>;
}

export { PetContext, PetProvider }