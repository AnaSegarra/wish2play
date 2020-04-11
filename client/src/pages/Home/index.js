// dependencies
import React, { useContext } from 'react';
import { Grid, Container } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { Signup } from './Signup';
import { Login } from './Login';
import { GamesCarousel } from '../../components/Carousel';

// styled components
import { StyledPaper } from '../../StyledComponents/Home.styled';

export const Home = () => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <GamesCarousel sort="-totalRating" />
          <GamesCarousel sort="-releaseYear" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <StyledPaper theme={theme} elevation={3}>
            <p className="paper-title">Sign in to wish2play</p>
            <Login />
            <Signup />
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};
