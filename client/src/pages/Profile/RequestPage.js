// dependencies
import React from 'react';
import { Container } from '@material-ui/core';

// local modules
import { makeRequest } from '../../services/requestsService';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { GameForm } from '../../components/GameForm';

const Request = () => {
  return (
    <Container>
      <GameForm handleAction={makeRequest} />
    </Container>
  );
};

export const RequestPage = withProtectedRoute(Request);
