// dependencies
import React, { useContext } from 'react';
import { Grid, Container } from '@material-ui/core';

// local modules
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { AuthContext } from '../../contexts/authContext';
import { GamesPlayedPreview } from './GamesPlayed';
import { UserData } from './UserDetails';

const Profile = () => {
  const { _id } = useContext(AuthContext).user;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <UserData />
        </Grid>
        <Grid item lg={9}>
          <GamesPlayedPreview userID={_id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export const ProtectedProfile = withProtectedRoute(Profile);
