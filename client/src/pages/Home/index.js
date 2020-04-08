// dependencies
import React from 'react';
import { makeStyles, Grid, Paper } from '@material-ui/core';

// local modules
import { Signup } from './Signup';
import { Login } from './Login';

// styled components
import { StyledPaper } from '../../StyledComponents/Home.styled';

export const Home = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <StyledPaper elevation={3}>
            <p className="paper-title">Sign in to wish2play</p>
            <Login />
            <Signup />
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};
