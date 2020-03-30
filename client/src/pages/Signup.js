// dependencies
import React, { useContext } from 'react';

// local modules
import { signup } from '../services/authService';
import { AuthContext } from '../contexts/authContext';
import { Form } from '../components/CredentialsForm';

export const Signup = () => {
  const { setUser } = useContext(AuthContext);

  const handleSignup = async newUser => {
    console.log('registering', newUser);
    const user = await signup(newUser);
    setUser(user);
  };

  return <Form handleAction={handleSignup} />;
};
