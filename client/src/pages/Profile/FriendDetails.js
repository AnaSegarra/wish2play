import React, { useContext } from 'react';
import { UserDetailsContainer } from '../../styles/Profile.styled';
import { usePaperStyles } from '../../styles/Global';
import { AuthContext } from '../../contexts/authContext';
import { isIncluded } from '../../helpers/listsHelpers';
import { RemoveUser, AddUser } from 'styled-icons/entypo';
import { addFriend, removeFriend } from '../../services/usersService';
import { UserInteraction } from '../../styles/Profile.styled';

export const ProfileData = ({ username, name, image, biography, _id }) => {
  const classes = usePaperStyles();
  const { user, setUser } = useContext(AuthContext);

  const handleRemoveFriend = async userID => {
    const userUpdated = await removeFriend(userID);
    setUser(userUpdated);
  };

  const handleNewFriend = async userID => {
    const userUpdated = await addFriend(userID);
    setUser(userUpdated);
  };

  return (
    <UserDetailsContainer elevation={3} className={classes.root}>
      <div className="img-container">
        <img
          src={
            image ||
            'https://res.cloudinary.com/diimdgeux/image/upload/c_scale,w_200/v1586733210/wish2play/profile-placeholder_ubq81f.png'
          }
          alt="user avatar"
          width="200"
          height="200"
        />
      </div>
      <div className="data">
        <p className="name">{name && name}</p>
        <p className="username">{username}</p>
        <p className="bio">{biography}</p>
      </div>
      <UserInteraction>
        {isIncluded(_id, user.friends) ? (
          <div onClick={() => handleRemoveFriend(_id)}>
            <RemoveUser size="25" className="remove-friend" />
            <p className="remove-friend">Unfriend</p>
          </div>
        ) : (
          <div onClick={() => handleNewFriend(_id)}>
            <AddUser size="25" className="add-friend" />
            <p className="add-friend">Add friend</p>
          </div>
        )}
      </UserInteraction>
    </UserDetailsContainer>
  );
};
