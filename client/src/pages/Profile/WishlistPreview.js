// dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// local modules
import { fetchWishlist } from '../../services/wishesService';
import { GamesGrid } from '../../components/GamesGrid';

// styled components
import { ListPlaceholder } from '../../styles/Profile.styled';

export const WishlistPreview = ({ userID, isOwner }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchWishlist(userID);
      const wishlistMapped = response.wishlist.map(({ game }) => {
        return { totalRating: game.totalRating, name: game.name, _id: game._id, image: game.image };
      });

      setWishlist(wishlistMapped);
      setLoading(false);
    })();
  }, [userID]);
  return (
    <>
      {wishlist.length > 0 ? (
        <GamesGrid gamesArr={wishlist.slice(0, 5)} type="wishlist" userID={userID} />
      ) : wishlist.length === 0 && !isLoading ? (
        <ListPlaceholder>
          {isOwner() ? (
            <>
              <p>Would you like start your own wishlist?</p>
              <Link to="/games">Find some games</Link>
            </>
          ) : (
            <p>Wishlist is empty</p>
          )}
        </ListPlaceholder>
      ) : (
        <></>
      )}
    </>
  );
};
