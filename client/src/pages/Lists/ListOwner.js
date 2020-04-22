// dependencies
import React from 'react';
import { Checkbox, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

// local modules
import { sortByName } from '../../helpers/listsHelpers';
import { updateWish } from '../../services/wishesService';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { Card } from '../../styles/Games.styled';
import { Button, CancelBtn } from '../../styles/Form';

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
              <StyledPaper elevation={3}>
                <Card>
                  <Link to={`/games/${wish.game._id}`}>{wish.game.name}</Link>
                  <div>
                    <img src={wish.game.image} />
                  </div>
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
                      <CancelBtn onClick={() => handleUpdate(wish._id, { isPublic: false })}>
                        Make private
                      </CancelBtn>
                    ) : (
                      <Button onClick={() => handleUpdate(wish._id, { isPublic: true })}>
                        Make public
                      </Button>
                    )
                  ) : (
                    <></>
                  )}
                </Card>
              </StyledPaper>
            </Grid>
          );
        })}
    </>
  );
};
