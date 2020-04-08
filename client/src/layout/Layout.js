import React, { useState } from 'react';
import { Header } from './Header';
import { AuthContextProvider } from '../contexts/authContext';
import { GlobalStyle } from '../StyledComponents/Global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../contexts/themes';

export const Layout = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
    console.log('changin');
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme === lightTheme ? lightTheme : darkTheme}>
        <GlobalStyle theme={theme} />
        <AuthContextProvider>
          <Header toggleTheme={toggleTheme} />
          <main>{children}</main>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
};
