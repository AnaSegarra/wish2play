import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Grid, Container } from '@material-ui/core';
import { GameForm } from '../../components/GameForm';
import { addGame } from '../../services/gamesService';
import { RequestsPanel } from './RequestsPanel';

const Admin = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={4} sm={12}>
          <RequestsPanel />
        </Grid>
        <Grid item lg={8} sm={12}>
          <p>Create a new game</p>
          <GameForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export const AdminPage = withProtectedRoute(Admin, true);
