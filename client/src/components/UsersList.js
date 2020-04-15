import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { UsersContainer } from '../styledComponents/Profile.styled';
import { AddUser } from 'styled-icons/entypo';
import { RemoveUser } from 'styled-icons/entypo';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export const UsersList = ({ list, type, handleNewFriend, handleRemoveFriend }) => {
  const classes = useStyles();

  return list.map((user, i) => {
    return (
      <UsersContainer key={i}>
        <Avatar alt={user.username} src={user.image} className={classes.small} />
        <p>{user.username}</p>
        {type === 'users' ? (
          <AddUser size="15" onClick={() => handleNewFriend(user._id)} />
        ) : (
          <RemoveUser size="15" onClick={() => handleRemoveFriend(user._id)} />
        )}
      </UsersContainer>
    );
  });
};
