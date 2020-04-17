import React, { useEffect, useState, useContext } from 'react';
import { fetchWishlist, updateWish } from '../../services/wishesService';
import { AuthContext } from '../../contexts/authContext';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { useParams } from 'react-router-dom';
import { sortByName } from '../../helpers/listsHelpers';
import { Checkbox } from '@material-ui/core';

const Wishlist = () => {
  const { id } = useParams();
  const { user, isLoading } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetchWishlist(id);
      setWishlist(sortByName(response.wishlist));
      setOwner(response.username);
    })();
  }, []);

  const handleUpdate = async (wishID, update) => {
    const updatedWish = await updateWish(wishID, update);
    const updatedWishlist = wishlist.filter(wish => wish._id !== updatedWish._id); // remove wish with previous status
    const newList = sortByName([...updatedWishlist, updatedWish]); // include wish updated
    setWishlist(newList);
  };

  const handleCheck = async wishID => {
    const updatedWish = await updateWish(wishID, { status: 'Fulfilled' });
    const updatedWishlist = wishlist.filter(wish => wish._id !== updatedWish._id); // remove wish with previous status
    const newList = sortByName([...updatedWishlist, updatedWish]); // include wish updated
    setWishlist(newList);
  };

  if (isLoading) return <></>;

  if (user._id === id)
    return (
      <div>
        <h2>Your wishlist</h2>
        {wishlist.length > 0 &&
          wishlist.map((wish, i) => {
            return (
              <div key={i}>
                <p>{wish.game.name}</p>
                <img src={wish.game.image} height="300" />
                <p>{wish.status}</p>
                <Checkbox
                  checked={wish.status === 'Fulfilled' ? true : false}
                  disabled={wish.status === 'Fulfilled' ? true : false}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  onChange={() => handleCheck(wish._id)}
                  size="small"
                />
                {wish.isPublic ? (
                  <button onClick={() => handleUpdate(wish._id, { isPublic: false })}>
                    Make private
                  </button>
                ) : (
                  <button onClick={() => handleUpdate(wish._id, { isPublic: true })}>
                    Make public
                  </button>
                )}
              </div>
            );
          })}
      </div>
    );

  return (
    <div>
      <h2>{`${owner}'s wishlist`}</h2>
      {wishlist.length > 0 &&
        wishlist.map((wish, i) => {
          return wish.isPublic ? (
            <div key={i}>
              <p>{wish.game.name}</p>
              <img src={wish.game.image} height="300" />
              <p>{wish.status}</p>
              {wish.status === 'Free' && <button>Reserve</button>}
            </div>
          ) : (
            ''
          );
        })}
    </div>
  );
};

export const ProtectedWishlist = withProtectedRoute(Wishlist);
