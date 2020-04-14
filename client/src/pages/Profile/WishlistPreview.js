import React, { useState, useEffect } from 'react';
import { fetchWishlist } from '../../services/wishesService';
import { GamesGrid } from '../../components/GamesGrid';

export const WishlistPreview = ({ userID }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchWishlist(userID);
      const wishlistMapped = response.map(({ game }) => {
        return { totalRating: game.totalRating, name: game.name, _id: game._id, image: game.image };
      });

      setWishlist(wishlistMapped);
    })();
  }, []);
  return <>{wishlist.length > 0 && <GamesGrid gamesArr={wishlist} type="wishlist" />}</>;
};
