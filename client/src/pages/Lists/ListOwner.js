import React from 'react';
import { sortByName } from '../../helpers/listsHelpers';
import { Checkbox, Grid } from '@material-ui/core';
import { updateWish } from '../../services/wishesService';
import { Link } from 'react-router-dom';

export const ListOwner = ({ wishlist, setWishlist }) => {
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

  return (
    <>
      {wishlist.length > 0 &&
        wishlist.map((wish, i) => {
          return (
            <Grid item lg={3} key={i}>
              <Link to={`/games/${wish.game._id}`}>{wish.game.name}</Link>
              <img src={wish.game.image} height="300" />
              <div>
                <p>{wish.status}</p>
                <Checkbox
                  checked={wish.status === 'Fulfilled' ? true : false}
                  disabled={wish.status === 'Fulfilled' ? true : false}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  onChange={() => handleCheck(wish._id)}
                  size="small"
                />
              </div>
              {wish.status === 'Free' ? (
                wish.isPublic ? (
                  <button onClick={() => handleUpdate(wish._id, { isPublic: false })}>
                    Make private
                  </button>
                ) : (
                  <button onClick={() => handleUpdate(wish._id, { isPublic: true })}>
                    Make public
                  </button>
                )
              ) : (
                <></>
              )}
            </Grid>
          );
        })}
    </>
  );
};
