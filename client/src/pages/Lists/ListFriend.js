import React from 'react';
import { SubmitBtn } from '../GameDetail/ReviewForm';
import { Tooltip, Container, Grid } from '@material-ui/core';
import { fetchWishlist, reserveFriendWish } from '../../services/wishesService';

import { sortByName, isIncluded } from '../../helpers/listsHelpers';

export const ListFriend = ({ wishlist, setWishlist, owner, user }) => {
  const makeReserved = async wishID => {
    const response = await reserveFriendWish(wishID);
    setUser(response.userUpdated);

    const updatedWishlist = wishlist.filter(wish => wish._id !== response.wishUpdated._id); // remove wish with previous status
    const newList = sortByName([...updatedWishlist, response.wishUpdated]); // include wish updated
    setWishlist(newList);
  };

  return (
    <>
      {wishlist.length > 0 &&
        wishlist.map((wish, i) => {
          return wish.isPublic ? (
            <Grid item lg={3} key={i}>
              <p>{wish.game.name}</p>
              <img src={wish.game.image} height="300" />
              <p>{wish.status}</p>

              {wish.status === 'Free' && (
                <Tooltip
                  title={
                    !isIncluded(owner._id, user.friends)
                      ? 'Has to be a friend to reserve their wish'
                      : ''
                  }>
                  <span>
                    <SubmitBtn
                      disabled={!isIncluded(owner._id, user.friends)}
                      onClick={() => makeReserved(wish._id)}
                      style={!isIncluded(owner._id, user.friends) ? { pointerEvents: 'none' } : {}}>
                      Reserve
                    </SubmitBtn>
                  </span>
                </Tooltip>
              )}
              {wish.status === 'Reserved' && isIncluded(wish._id, user.reservedWishes) && (
                <p>Reservao</p>
              )}
            </Grid>
          ) : (
            ''
          );
        })}
    </>
  );
};
