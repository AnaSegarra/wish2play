// dependencies
import React from 'react';

// local modules
import { Signup } from './Signup';
import { Login } from './Login';

// styled components
import { StyledPaper } from '../StyledComponents/Home.styled';

export const Home = () => {
  return (
    <StyledPaper elevation={3}>
      <p className="paper-title">Sign in to wish2play</p>
      <Login />
      <Signup />
    </StyledPaper>
  );
};
