// dependencies
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

// local modules
import { Header } from './Header';
import { AuthContextProvider } from '../contexts/authContext';
import { lightTheme, darkTheme } from '../contexts/themes';

// styled components
import { GlobalStyle } from '../styles/Global';
import { TokenContextProvider } from '../contexts/tokenContext';

// makes available both theme and user to the whole app
export const Layout = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
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
        <TokenContextProvider>
          <AuthContextProvider>
            <Header toggleTheme={toggleTheme} />
            <main>{children}</main>
          </AuthContextProvider>
        </TokenContextProvider>
      </ThemeProvider>
    </>
  );
};
