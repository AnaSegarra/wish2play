import React, { useState } from 'react';
import { Avatar, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { UsersContainer } from '../styledComponents/Profile.styled';
import { Link } from 'react-router-dom';
import { RemoveUser } from 'styled-icons/entypo';
import { AddUser } from 'styled-icons/entypo';
import { addFriend, removeFriend } from '../services/usersService';

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
          <Link to={`/wishlist/${user._id}`}>Wishlist</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={`/games-played/${user._id}`}>Games played</Link>
        </MenuItem>
      </Menu>
      {type === 'friends' ? (
        <RemoveUser size="15" onClick={() => handleRemoveFriend(user._id)} />
      ) : (
        <AddUser size="15" onClick={() => handleNewFriend(user._id)} />
      )}
    </UsersContainer>
  );
};
