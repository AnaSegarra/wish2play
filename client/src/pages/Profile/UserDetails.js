// dependencies
import React, { useState } from 'react';
import { useContext } from 'react';
import { Tooltip } from '@material-ui/core';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { EditForm } from './EditForm';

export const UserData = () => {
  const { username, image, name } = useContext(AuthContext).user;
  const [isEditing, setIsEditing] = useState(false);

  const showEditForm = () => setIsEditing(!isEditing);

  return (
    <div>
      <Tooltip title="Change your avatar" arrow>
        {image ? (
          <img src={image} />
        ) : (
          <img src="https://res.cloudinary.com/diimdgeux/image/upload/c_scale,w_200/v1586733210/wish2play/profile-placeholder_ubq81f.png" />
        )}
      </Tooltip>
      {!isEditing ? (
        <>
          <p>{name && name}</p>
          <p>{username}</p>
          <button onClick={showEditForm}>Edit profile</button>
        </>
      ) : (
        <EditForm setEditStatus={showEditForm} />
      )}
    </div>
  );
};
