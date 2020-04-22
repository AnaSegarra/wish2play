// dependencies
import React, { createContext, useState, useEffect } from 'react';

// local modules
import { getCurrentUser } from '../services/authService';

export const AuthContext = createContext(); // user context

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        setUser(null);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
  );
};
