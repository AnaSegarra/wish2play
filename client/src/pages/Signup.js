// dependencies
import React, { useContext, useState } from 'react';

// local modules
import { signup } from '../services/authService';
import { AuthContext } from '../contexts/authContext';
import { Form } from '../components/CredentialsForm';

export const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSignup = async (newUser) => {
    const response = await signup(newUser);

    response.user ? setUser(response.user) : setError(response);
  };

  return <Form handleAction={handleSignup} />;
};
