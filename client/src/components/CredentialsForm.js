// dependencies
import React, { useState, useContext } from 'react';

// styled components
import { StyledForm, Input, Button } from '../StyledComponents/Form';
import { ThemeContext } from 'styled-components';

export const Form = ({ handleAction, id }) => {
  const theme = useContext(ThemeContext);
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
    handleAction(newUser);
  };

  return (
    <StyledForm onSubmit={handleSubmit} id={id} theme={theme}>
      <label htmlFor="username">Username</label>
      <Input type="text" value={newUser.username} name="username" onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <Input type="password" value={newUser.password} name="password" onChange={handleChange} />
      {!id && <Button type="submit">Sign in</Button>}
    </StyledForm>
  );
};
