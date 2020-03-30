import React from 'react';
import { Header } from './Header';
import { AuthContextProvider } from '../contexts/authContext';

export const Layout = ({ children }) => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <main>{children}</main>
      </AuthContextProvider>
    </>
  );
};
