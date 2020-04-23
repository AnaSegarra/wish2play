// dependencies
import React, { useContext } from 'react';
import { Grid, Container } from '@material-ui/core';

// local modules
import { Signup } from './Signup';
import { Login } from './Login';
import { GamesCarousel } from '../../components/Carousel';
import { AuthContext } from '../../contexts/authContext';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { usePaperStyles } from '../../styles/Global';

export const Home = () => {
  const classes = usePaperStyles();
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
            <StyledPaper elevation={3} className={classes.root}>
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
