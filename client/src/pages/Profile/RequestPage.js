// dependencies
import React from 'react';
import { Container } from '@material-ui/core';

// local modules
import { makeRequest } from '../../services/requestsService';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { GameForm } from '../../components/GameForm';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { usePaperStyles } from '../../styles/Global';

const Request = () => {
  const classes = usePaperStyles();
  return (
    <Container>
      <StyledPaper elevation={3} className={classes.root}>
        <p className="paper-title">Request a game you want</p>
        <GameForm handleAction={makeRequest} user={true} />
      </StyledPaper>
    </Container>
  );
};

export const RequestPage = withProtectedRoute(Request);
