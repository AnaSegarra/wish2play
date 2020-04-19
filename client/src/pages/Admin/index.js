import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Container, Grid, Paper } from '@material-ui/core';
import { GameForm } from '../../components/GameForm';

const Admin = () => {
  return (
    <Container>
      <Paper elevation={3}>
        <h3>Create a new game</h3>
        <GameForm />
      </Paper>
    </Container>
  );
};

export const AdminPage = withProtectedRoute(Admin, true);
