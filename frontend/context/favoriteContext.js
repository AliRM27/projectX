import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isRemoved, setRemoved] = useState(false); // your global variable

  return (
    <UserContext.Provider value={{ isRemoved, setRemoved }}>
      {children}
    </UserContext.Provider>
  );
};

export const useRemoved = () => useContext(UserContext);
