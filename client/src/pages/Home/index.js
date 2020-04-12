// dependencies
import React, { useContext } from 'react';
import { Grid, Container } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { Signup } from './Signup';
import { Login } from './Login';
import { GamesCarousel } from '../../components/Carousel';
import { AuthContext } from '../../contexts/authContext';

// styled components
import { StyledPaper } from '../../StyledComponents/Home.styled';

export const Home = () => {
  const theme = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={!user ? 9 : 12}>
          <GamesCarousel sort="-totalRating" />
          <GamesCarousel sort="-releaseYear" />
        </Grid>
        {!user && (
          <Grid item xs={12} lg={3}>
            <StyledPaper theme={theme} elevation={3}>
              <p className="paper-title">Sign in to wish2play</p>
              <Login />
              <Signup />
            </StyledPaper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
