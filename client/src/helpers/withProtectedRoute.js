// dependencies
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// local modules
import { AuthContext } from '../contexts/authContext';

// protects privage pages according to user and role
export const withProtectedRoute = Component => props => {
  const { user, isLoading } = useContext(AuthContext);
  return user ? <Component /> : !user && !isLoading ? <Redirect to="/" /> : <></>; // empty placeholder
};
