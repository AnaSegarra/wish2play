import React, { useEffect, useState, useContext } from 'react';
import { fetchWishlist, reserveFriendWish } from '../../services/wishesService';
import { AuthContext } from '../../contexts/authContext';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { useParams } from 'react-router-dom';
import { sortByName, isIncluded } from '../../helpers/listsHelpers';
import { ListOwner } from './ListOwner';
import { Tooltip, Container, Grid } from '@material-ui/core';
import { ListFriend } from './ListFriend';

const Wishlist = () => {
  const { id } = useParams();
  const { user, isLoading, setUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetchWishlist(id);
      setWishlist(sortByName(response.wishlist));
      setOwner(response.user);
    })();
  }, []);

  if (isLoading) return <></>;

  if (user._id === id) {
    return (
      <Container>
        <h2>Your wishlist</h2>
        <Grid container spacing={3}>
          <ListOwner wishlist={wishlist} setWishlist={setWishlist} />
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <h2>{`${owner.username}'s wishlist`}</h2>
      <Grid container spacing={3}>
        <ListFriend
          wishlist={wishlist}
          setWishlist={setWishlist}
          owner={owner}
          user={user}
          setUser={setUser}
        />
      </Grid>
    </Container>
  );
};

export const ProtectedWishlist = withProtectedRoute(Wishlist);
