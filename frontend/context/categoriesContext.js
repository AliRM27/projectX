import React, { createContext, useContext, useState, useEffect } from "react";

const CategoreisContext = createContext();

export const CategoreisProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  return (
    <CategoreisContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoreisContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoreisContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoreisProvider");
  }
  return context;
};
