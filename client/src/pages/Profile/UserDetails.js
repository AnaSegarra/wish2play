// dependencies
import React, { useState } from 'react';
import { useContext } from 'react';
import { Tooltip } from '@material-ui/core';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { DataForm, ImageForm } from './EditForm';
import { FriendsList, UsersList } from './PeopleLists';

export const UserData = () => {
  const { username, image, name } = useContext(AuthContext).user;
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingImg, setIsChangingImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // used to create img preview

  const showEditForm = () => setIsEditing(!isEditing);

  const showImgForm = () => {
    setIsChangingImg(!isChangingImg);
    setSelectedFile(null);
  };

  return (
    <div>
      <Tooltip title="Change your avatar" arrow onClick={showImgForm}>
        <img
          src={
            selectedFile ||
            image ||
            'https://res.cloudinary.com/diimdgeux/image/upload/c_scale,w_200/v1586733210/wish2play/profile-placeholder_ubq81f.png'
          }
          alt="user avatar"
          style={{ cursor: 'pointer' }}
          width="200"
          height="200"
        />
      </Tooltip>
      {isChangingImg && <ImageForm setFile={setSelectedFile} showImgForm={showImgForm} />}
      {!isEditing ? (
        <>
          <p>{name && name}</p>
          <p>{username}</p>
          <button onClick={showEditForm}>Edit profile</button>
        </>
      ) : (
        <DataForm setEditStatus={showEditForm} />
      )}
      <FriendsList />
      <UsersList />
    </div>
  );
};
