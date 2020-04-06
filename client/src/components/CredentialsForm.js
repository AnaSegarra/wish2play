// dependencies
import React, { useState } from 'react';

// styled components
import { StyledForm, Input, Button } from '../StyledComponents/Form';

export const Form = ({ handleAction, id }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submiting');
    handleAction(newUser);
  };

  return (
    <StyledForm onSubmit={handleSubmit} id={id}>
      <label htmlFor="username">Username</label>
      <Input type="text" value={newUser.username} name="username" onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <Input type="password" value={newUser.password} name="password" onChange={handleChange} />
      {!id && <Button type="submit">Sign in</Button>}
    </StyledForm>
  );
};
