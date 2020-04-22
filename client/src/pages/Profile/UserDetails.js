// dependencies
import React, { useState, useContext } from 'react';
import { Tooltip } from '@material-ui/core';
import { EditAlt } from '@styled-icons/boxicons-solid';
import { ThemeContext } from 'styled-components';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { DataForm, ImageForm } from './EditForm';
import { FriendsList, UsersList } from './PeopleLists';

// styled components
import { UserDetailsContainer } from '../../styles/Profile.styled';

export const UserData = () => {
  const { username, image, name, biography } = useContext(AuthContext).user;
  const theme = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingImg, setIsChangingImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // used to create img preview

  const showEditForm = () => setIsEditing(!isEditing);

  const showImgForm = () => {
    setIsChangingImg(!isChangingImg);
    setSelectedFile(null);
  };

  return (
    <UserDetailsContainer elevation={3} theme={theme}>
      <Tooltip title="Change your avatar" arrow onClick={showImgForm}>
        <div className="img-container">
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
        </div>
      </Tooltip>
      {isChangingImg && <ImageForm setFile={setSelectedFile} showImgForm={showImgForm} />}
      {!isEditing ? (
        <div className="data">
          <div>
            <EditAlt onClick={showEditForm} size="20" className="edit" />
          </div>
          <p className="name">{name && name}</p>
          <p className="username">{username}</p>
          <p className="bio">{biography}</p>
        </div>
      ) : (
        <DataForm setEditStatus={showEditForm} />
      )}
      <FriendsList />
      <UsersList />
    </UserDetailsContainer>
  );
};
