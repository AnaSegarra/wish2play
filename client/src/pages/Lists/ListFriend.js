// dependencies
import React from 'react';
import { Tooltip, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

// local modules
import { reserveFriendWish, deleteFriendWish } from '../../services/wishesService';
import { sortByName, isIncluded } from '../../helpers/listsHelpers';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { Card } from '../../styles/Games.styled';
import { Button, CancelBtn } from '../../styles/Form';
import { usePaperStyles } from '../../styles/Global';

export const ListFriend = ({ wishlist, setWishlist, owner, user, setUser }) => {
  const classes = usePaperStyles();
  const makeReserved = async wishID => {
    const response = await reserveFriendWish(wishID);
    setUser(response.userUpdated);

    const updatedWishlist = wishlist.filter(wish => wish._id !== response.wishUpdated._id); // remove wish with previous status
    const newList = sortByName([...updatedWishlist, response.wishUpdated]); // include wish updated
    setWishlist(newList);
  };

  const removeReserved = async wishID => {
    const response = await deleteFriendWish(wishID);
    setUser(response.user);

    const updatedWishlist = wishlist.filter(wish => wish._id !== response.wish._id); // remove wish with previous status
    const newList = sortByName([...updatedWishlist, response.wish]); // include wish updated
    setWishlist(newList);
  };

  return (
    <>
      {owner &&
        wishlist.length > 0 &&
        wishlist.map((wish, i) => {
          return wish.isPublic ? (
            <Grid item lg={3} key={i}>
              <StyledPaper elevation={3} className={classes.root}>
                <Card>
                  <Link to={`/games/${wish.game._id}`}>{wish.game.name}</Link>
                  <div>
                    <img src={wish.game.image} />
                  </div>
                  <div>
                    <p>Status: {wish.status}</p>
                  </div>
                  {wish.status === 'Free' && (
                    <Tooltip
                      title={
                        !isIncluded(owner._id, user.friends)
                          ? 'Has to be a friend to reserve their wish'
                          : ''
                      }>
                      <span className="btn-container">
                        <Button
                          disabled={!isIncluded(owner._id, user.friends)}
                          onClick={() => makeReserved(wish._id)}
                          style={
                            !isIncluded(owner._id, user.friends) ? { pointerEvents: 'none' } : {}
                          }>
                          Reserve
                        </Button>
                      </span>
                    </Tooltip>
                  )}
                  {wish.status === 'Reserved' && isIncluded(wish._id, user.reservedWishes) && (
                    <span className="btn-container">
                      <CancelBtn onClick={() => removeReserved(wish._id)}>Unreserve</CancelBtn>
                    </span>
                  )}
                </Card>
              </StyledPaper>
            </Grid>
          ) : (
            <></>
          );
        })}
    </>
  );
};
