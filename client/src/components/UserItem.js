// dependencies
import React, { useState } from 'react';
import { RemoveUser } from 'styled-icons/entypo';
import { AddUser } from 'styled-icons/entypo';
import { Avatar, makeStyles, Menu, MenuItem } from '@material-ui/core';

// local modules
import { addFriend, removeFriend } from '../services/usersService';

// styled components
import { UsersContainer, StyledLink } from '../styles/Profile.styled';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export const User = ({ user, setUser, type }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveFriend = async userID => {
    const userUpdated = await removeFriend(userID);
    setUser(userUpdated);
  };

  const handleNewFriend = async userID => {
    const userUpdated = await addFriend(userID);
    setUser(userUpdated);
  };

  return (
    <UsersContainer>
      <Avatar alt={user.username} src={user.image} className={classes.small} />
      <p aria-controls={`simple-${user._id}`} aria-haspopup="true" onClick={handleClick}>
        {user.username}
      </p>
      <Menu
        id={`simple-${user._id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <StyledLink to={`/wish2play/@${user.username}`}>Profile</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledLink to={`/wishlist/${user._id}`}>Wishlist</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledLink to={`/games-played/${user._id}`}>Games played</StyledLink>
        </MenuItem>
      </Menu>
      {type === 'friends' ? (
        <RemoveUser
          size="15"
          onClick={() => handleRemoveFriend(user._id)}
          className="remove-friend"
        />
      ) : (
        <AddUser size="15" onClick={() => handleNewFriend(user._id)} className="add-friend" />
      )}
    </UsersContainer>
  );
};
