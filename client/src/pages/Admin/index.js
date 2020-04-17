import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Container } from '@material-ui/core';
import { GameForm } from '../../components/GameForm';

const Admin = () => {
  return (
    <Container>
      <h3>Create a new game</h3>
      <GameForm />
    </Container>
  );
};

export const AdminPage = withProtectedRoute(Admin, true);
