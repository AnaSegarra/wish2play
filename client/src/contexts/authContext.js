import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        console.log('useEffect in authContext');

        const response = await getCurrentUser();
        console.log('desde el useEffect', response);
        setUser({ username: response.username });
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
