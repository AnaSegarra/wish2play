// dependencies
import React, { useContext } from 'react';
import { Grid, Container, Paper } from '@material-ui/core';

// local modules
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { AuthContext } from '../../contexts/authContext';
import { GamesPlayedPreview } from './GamesPlayedPreview';
import { WishlistPreview } from './WishlistPreview';
import { UserData } from './UserDetails';
import { UserRequests } from './UserRequests';
import { ReservedWishes } from './ReservedWishes';

const Profile = () => {
  const { _id } = useContext(AuthContext).user;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={3}>
          <UserData />
        </Grid>
        <Grid item lg={6}>
          <Paper>
            <h3>Games you played</h3>
            <GamesPlayedPreview userID={_id} />
            <h3>Your wishlist</h3>
            <WishlistPreview userID={_id} />
          </Paper>
        </Grid>
        <Grid item lg={3}>
          <UserRequests />
          <ReservedWishes />
        </Grid>
      </Grid>
    </Container>
  );
};

export const ProtectedProfile = withProtectedRoute(Profile);
