// dependencies
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// local modules
import { AuthContext } from '../contexts/authContext';

// protects privage pages according to user and role
export const withProtectedRoute = (Component, restricted = false) => props => {
  const { user, isLoading } = useContext(AuthContext);

  if (user) {
    // redirect to profile if page is restricted and user is not admin
    if (restricted && !user.isAdmin) return <Redirect to={'/wish2play/profile'} />;

    // redirect to admin panel if page is not restricted and user is admin
    if (!restricted && user.isAdmin) return <Redirect to="/admin" />;

    // otherwise show component asked for
    return <Component />;
  }
  if (!user && !isLoading) {
    return <Redirect to="/" />;
  }
  return <></>; // empty placeholder
};
