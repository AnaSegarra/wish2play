// dependencies
import React, { useContext, useState } from 'react';

// local modules
import { login } from '../services/authService';
import { AuthContext } from '../contexts/authContext';
import { Form } from '../components/CredentialsForm';

export const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogin = async loggedUser => {
    const response = await login(loggedUser);

    response.user ? setUser(response.user) : setError(response);
  };

  return (
    <>
      <Form handleAction={handleLogin} />
    </>
  );
};
