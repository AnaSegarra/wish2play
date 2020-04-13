// dependencies
import React from 'react';
import { useContext } from 'react';
import { Tooltip } from '@material-ui/core';

// local modules
import { AuthContext } from '../../contexts/authContext';

export const UserData = () => {
  const { username, image, name } = useContext(AuthContext).user;

  return (
    <div>
      <Tooltip title="Change your avatar" arrow>
        {image ? (
          <img src={image} />
        ) : (
          <img src="https://res.cloudinary.com/diimdgeux/image/upload/c_scale,w_200/v1586733210/wish2play/profile-placeholder_ubq81f.png" />
        )}
      </Tooltip>
      <p>{name && name}</p>
      <p>{username}</p>
      <button>Edit profile</button>
    </div>
  );
};
