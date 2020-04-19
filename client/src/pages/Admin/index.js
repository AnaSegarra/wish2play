import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Container, Grid } from '@material-ui/core';
import { GameForm } from '../../components/GameForm';

const Admin = () => {
  return (
    <Container>
      <Grid container>
        <Grid item lg={6}>
          <h3>Create a new game</h3>
          <GameForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export const AdminPage = withProtectedRoute(Admin, true);
