import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

export const withProtectedRoute = Component => () => {
  const { user, isLoading } = useContext(AuthContext);
  return user ? <Component /> : !user && !isLoading ? <Redirect to="/login" /> : <></>; // empty placeholder
};
