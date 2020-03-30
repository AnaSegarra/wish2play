import React from 'react';
import { Header } from './Header';
import { AuthContextProvider } from '../contexts/authContext';
import { GlobalStyle } from '../StyledComponents/Global';

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <Header />
        <main>{children}</main>
      </AuthContextProvider>
    </>
  );
};
