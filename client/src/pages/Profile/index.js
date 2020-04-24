// dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';

// local modules
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { AuthContext } from '../../contexts/authContext';
import { fetchSingleUser } from '../../services/usersService';
import { ProfileData } from './FriendDetails';
import { GamesPlayedPreview } from './GamesPlayedPreview';
import { WishlistPreview } from './WishlistPreview';
import { UserDetails } from './UserDetails';
import { UserRequests } from './UserRequests';
import { ReservedWishes } from './ReservedWishes';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { usePaperStyles } from '../../styles/Global';

const Profile = () => {
  const { username } = useParams();
  const currentUser = useContext(AuthContext).user.username;
  const [profileOwner, setProfileOwner] = useState();
  const classes = usePaperStyles();

  useEffect(() => {
    (async () => {
      const response = await fetchSingleUser(username);
      setProfileOwner(response);
    })();
  }, [username]);

  const isUserProfile = () => currentUser === profileOwner.username;

  if (!profileOwner) return <></>;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} xs={12}>
          {isUserProfile() ? <UserDetails /> : <ProfileData {...profileOwner} />}
        </Grid>
        <Grid item lg={isUserProfile() ? 6 : 9} md={5} xs={12}>
          <StyledPaper elevation={3} className={classes.root}>
            <p className="paper-title">
              {isUserProfile() ? 'Games you played' : `Games played by ${profileOwner.username}`}
            </p>
            <GamesPlayedPreview userID={profileOwner._id} isOwner={isUserProfile} />
          </StyledPaper>
          <StyledPaper elevation={3} className={classes.root}>
            <p className="paper-title">
              {isUserProfile() ? 'Your wishlist' : `${profileOwner.username}'s wishlist`}
            </p>
            <WishlistPreview userID={profileOwner._id} isOwner={isUserProfile} />
          </StyledPaper>
        </Grid>
        {isUserProfile() && (
          <Grid item lg={3} md={3} xs={12}>
            <ReservedWishes />
            <UserRequests />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export const ProtectedProfile = withProtectedRoute(Profile);
