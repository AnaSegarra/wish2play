// dependencies
import React, { createContext, useState, useEffect } from 'react';
import { getToken } from '../services/spotifyService';

// local modules

export const TokenContext = createContext(); // token context

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // const token = await getToken();
        setToken(false);
      } catch (error) {
        setToken(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <TokenContext.Provider value={{ token, isLoading }}>{children}</TokenContext.Provider>;
};
