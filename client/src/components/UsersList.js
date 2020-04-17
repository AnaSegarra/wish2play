import React, { useState } from 'react';
import { Avatar, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { UsersContainer } from '../styledComponents/Profile.styled';
import { AddUser } from 'styled-icons/entypo';
import { RemoveUser } from 'styled-icons/entypo';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export const UsersList = ({ list, type, handleNewFriend, handleRemoveFriend }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return list.map((user, i) => {
    return (
      <UsersContainer key={i}>
        <Avatar alt={user.username} src={user.image} className={classes.small} />
        <p aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {user.username}
        </p>
        <Menu
          id="simple-menu"
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
        {type === 'users' ? (
          <AddUser size="15" onClick={() => handleNewFriend(user._id)} />
        ) : (
          <RemoveUser size="15" onClick={() => handleRemoveFriend(user._id)} />
        )}
      </UsersContainer>
    );
  });
};
