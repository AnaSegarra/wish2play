// dependencies
import React, { useContext } from 'react';
import { Grid, Container, Paper } from '@material-ui/core';

// local modules
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { AuthContext } from '../../contexts/authContext';
import { GamesPlayedPreview } from './GamesPlayedPreview';
import { WishlistPreview } from './WishlistPreview';
import { UserData } from './UserDetails';
import { UserRequests } from './UserRequests';
import { ReservedWishes } from './ReservedWishes';

// styled components
import { StyledPaper } from '../../styles/Home.styled';

const Profile = () => {
  const { _id } = useContext(AuthContext).user;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={3}>
          <UserData />
        </Grid>
        <Grid item lg={7}>
          <StyledPaper>
            <p className="paper-title">Games you played</p>
            <GamesPlayedPreview userID={_id} />
          </StyledPaper>
          <StyledPaper>
            <p className="paper-title">Your wishlist</p>
            <WishlistPreview userID={_id} />
          </StyledPaper>
        </Grid>
        <Grid item lg={2}>
          <UserRequests />
          <ReservedWishes />
        </Grid>
      </Grid>
    </Container>
  );
};

export const ProtectedProfile = withProtectedRoute(Profile);
