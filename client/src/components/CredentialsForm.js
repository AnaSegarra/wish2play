// dependencies
import React, { useState } from 'react';

export const Form = ({ handleAction }) => {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" value={newUser.username} name="username" onChange={handleChange} />
      <label htmlFor="password">Password:</label>
      <input type="password" value={newUser.password} name="password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};
