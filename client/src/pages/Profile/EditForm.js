// dependencies
import React, { useContext, useState } from 'react';

// local modules
import { updateProfile, uploadImage } from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import { ErrorMsg } from '../../components/ErrorMsg';

export const DataForm = ({ setEditStatus }) => {
  const { user, setUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState(user);
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />

        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />

        <button type="submit">Save changes</button>
      </form>
      <button onClick={setEditStatus}>Cancel</button>
      {error.isError && (
        <ErrorMsg
          isError={error.isError}
          handleClose={() => setError({ isError: false, errorMsg: '' })}
          position={{ vertical: 'center', horizontal: 'left' }}
          errorMsg={error.errorMsg}
        />
      )}
    </>
  );
};

export const ImageForm = ({ setFile, setImgStatus }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImgEdit = e => {
    const imgSelected = e.target.files[0];
    setFile(URL.createObjectURL(imgSelected)); // creates image preview
    setSelectedFile(imgSelected);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const img = new FormData();
    img.append('image', selectedFile);
    const newImage = await uploadImage(img);
    setImgStatus(false);
  };

  return (
    <form onSubmit={handleSubmit} id="upload-form">
      <input type="file" onChange={handleImgEdit} />
      <button type="submit">Save changes</button>
    </form>
  );
};
