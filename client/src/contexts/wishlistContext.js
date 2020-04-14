// dependencies
import React, { createContext, useState, useEffect, useContext } from 'react';

// local modules
import { AuthContext } from './authContext';
import { fetchWishlist } from '../services/wishesService';

export const WishlistContext = createContext(); // wishlist context

export const WishlistContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    (async () => {
      const response = user && (await fetchWishlist(user._id));

      setWishlist(response);
    })();
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
