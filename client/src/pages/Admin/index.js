// dependencies
import React from 'react';
import { Container } from '@material-ui/core';

// local modules
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { GameForm } from '../../components/GameForm';
import { StyledPaper } from '../../styles/Home.styled';

const Admin = () => {
  return (
    <Container>
      <StyledPaper elevation={3}>
        <p className="paper-title">Create a new game</p>
        <GameForm />
      </StyledPaper>
    </Container>
  );
};

export const AdminPage = withProtectedRoute(Admin, true);
