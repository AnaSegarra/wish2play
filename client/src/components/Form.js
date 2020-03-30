import React, { useState, useContext } from 'react';
import { signup } from '../services/authService';
import { AuthContext } from '../contexts/authContext';

export const Form = () => {
  const { setUser } = useContext(AuthContext);
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
    console.log('registering');
    const user = await signup(newUser);
    setUser(user);
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
