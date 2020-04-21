// dependencies
import React, { useContext, useState } from 'react';

// local modules
import { updateProfile, uploadImage } from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import { ErrorMsg } from '../../components/AlertMsg';

// styled components
import { Input, Button, CancelBtn } from '../../styles/Form';
import { Textarea } from '../../styles/GameDetail.styled';

export const DataForm = ({ setEditStatus }) => {
  const { user, setUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({ ...user, name: user.name || '' });
  const [error, setError] = useState({ isError: false, errorMsg: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await updateProfile(updatedUser);
    if (response.user) {
      setUser(response.user);
      setEditStatus();
    } else {
      setError({ isError: true, errorMsg: response });
    }
  };

  return (
    <div className="data">
      <form onSubmit={handleSubmit} id="edit-form">
        <label htmlFor="name">Name:</label>
        <Input type="text" name="name" value={updatedUser.name} onChange={handleChange} />

        <label htmlFor="username">Username:</label>
        <Input type="text" name="username" value={updatedUser.username} onChange={handleChange} />

        <Textarea
          rows="7"
          name="biography"
          maxLength="200"
          value={updatedUser.biography}
          onChange={handleChange}
          placeholder="Add a bio"
        />
      </form>
      <div className="btn-container">
        <Button type="submit" form="edit-form">
          Save changes
        </Button>
        <CancelBtn onClick={setEditStatus}>Cancel</CancelBtn>
      </div>
      {error.isError && (
        <ErrorMsg
          isError={error.isError}
          handleClose={() => setError({ isError: false, errorMsg: '' })}
          position={{ vertical: 'bottom', horizontal: 'left' }}
          errorMsg={error.errorMsg}
        />
      )}
    </div>
  );
};

export const ImageForm = ({ setFile, showImgForm }) => {
  const { setUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({ isError: false, errorMsg: '' });

  const handleImgEdit = e => {
    const imgSelected = e.target.files[0];
    setFile(URL.createObjectURL(imgSelected)); // creates image preview
    setSelectedFile(imgSelected);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const img = new FormData();
    img.append('image', selectedFile);
    try {
      const response = await uploadImage(img);
      setUser(response.user);
      showImgForm();
    } catch (error) {
      setError({ isError: true, errorMsg: error.message });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="upload-form">
        <input type="file" onChange={handleImgEdit} />
      </form>
      <div className="btn-container">
        <Button type="submit" form="upload-form">
          Save changes
        </Button>
        <CancelBtn onClick={showImgForm}>Cancel</CancelBtn>
      </div>
      {error.isError && (
        <ErrorMsg
          isError={error.isError}
          handleClose={() => setError({ isError: false, errorMsg: '' })}
          position={{ vertical: 'bottom', horizontal: 'left' }}
          errorMsg={error.errorMsg}
        />
      )}
    </>
  );
};
