import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Grid, Container } from '@material-ui/core';
import { GameForm } from './GameForm';

const Admin = () => {
  return (
    <Container>
      <Grid container>
        <Grid item lg={4} sm={12}>
          requests
        </Grid>
        <Grid item lg={8} sm={12}>
          <GameForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export const AdminPage = withProtectedRoute(Admin, true);
