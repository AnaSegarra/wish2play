import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        console.log('useEffect in authContext');

        const user = await getCurrentUser();
        console.log('desde el useEffect', user);
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
