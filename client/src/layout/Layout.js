// dependencies
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

// local modules
import { Header } from './Header';
import { AuthContextProvider } from '../contexts/authContext';

import { lightTheme, darkTheme } from '../contexts/themes';

// styled components
import { GlobalStyle } from '../styledComponents/Global';
import { WishlistContextProvider } from '../contexts/wishlistContext';

// makes available both theme and user to the whole app
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
          <WishlistContextProvider>
            <Header toggleTheme={toggleTheme} />
            <main>{children}</main>
          </WishlistContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
};
