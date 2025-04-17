import React, { createContext, useContext, useState } from 'react';

// Create the Admin Context
const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the Admin Context
export const useAdmin = () => {
  return useContext(AdminContext);
};
