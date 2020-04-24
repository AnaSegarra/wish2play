// dependencies
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

// local modules
import { fetchWishlist } from '../../services/wishesService';
import { AuthContext } from '../../contexts/authContext';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { sortByName } from '../../helpers/listsHelpers';
import { ListOwner } from './ListOwner';
import { ListFriend } from './ListFriend';

const Wishlist = () => {
  const { id } = useParams();
  const { user, isLoading, setUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [owner, setOwner] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchWishlist(id);
      if (user._id === id) {
        setWishlist(sortByName(response.wishlist));
        setOwner(response.user);
      } else {
        const privateRemoved = response.wishlist.filter(wish => wish.isPublic);
        setWishlist(sortByName(privateRemoved));
        setOwner(response.user);
      }
    })();
  }, []);

  if (isLoading) return <></>;

  if (user._id === id) {
    return (
      <Container>
        <h2 className="page-title">Your wishlist</h2>
        <Grid container spacing={3}>
          <ListOwner wishlist={wishlist} setWishlist={setWishlist} />
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      {owner && <h2 className="page-title">{`${owner.username}'s wishlist`}</h2>}
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
