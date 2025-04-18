import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Admin Context
const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get admin data from localStorage
    try {
      const storedAdmin = localStorage.getItem('admin');
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAdmin = (adminData) => {
    try {
      if (adminData) {
        localStorage.setItem('admin', JSON.stringify(adminData));
        setAdmin(adminData);
      } else {
        localStorage.removeItem('admin');
        setAdmin(null);
      }
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, updateAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the Admin Context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminProvider;
