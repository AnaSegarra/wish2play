import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { GameForm } from '../../components/GameForm';
import { makeRequest } from '../../services/requestsService';
import { Container } from '@material-ui/core';

const Request = () => {
  return (
    <Container>
      <GameForm handleAction={makeRequest} />
    </Container>
  );
};

export const RequestPage = withProtectedRoute(Request);
