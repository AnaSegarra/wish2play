// dependencies
import React, { useContext } from 'react';

// local modules
import { login } from '../services/authService';
import { AuthContext } from '../contexts/authContext';
import { Form } from '../components/CredentialsForm';

export const Login = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogin = async loggedUser => {
    console.log('login in', loggedUser);
    const user = await login(loggedUser);
    setUser(user);
  };

  return <Form handleAction={handleLogin} />;
};
