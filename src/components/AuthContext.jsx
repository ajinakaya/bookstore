

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token) => {
   
    const decodedUser = decodeUserFromToken(token);

    setUser(decodedUser);
    
    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(decodedUser));


  };

  const logout = () => {
    setUser(null);
    
    // Clear user information from localStorage
    localStorage.removeItem('user');


  };

  const isAuthenticated = () => {
    return !!user;
  };

  const authContextValue = {
    user,
    login,
    logout,
    isAuthenticated,
  
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


const decodeUserFromToken = (token) => {

  try {
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  } catch (error) {
    console.error('Error decoding user from token:', error);
    return null;
  }
};

export { AuthProvider, useAuth };


