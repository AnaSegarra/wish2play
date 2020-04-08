// dependencies
import React, { useContext, useState } from 'react';
import { GameController } from '@styled-icons/entypo';
import { UserCircle, Sun as FullSun } from '@styled-icons/boxicons-solid';
import { LogOut, Sun } from '@styled-icons/boxicons-regular';
import { ThemeContext } from 'styled-components';

// local modules
import { AuthContext } from '../contexts/authContext';
import { logout } from '../services/authService';

// styled components
import { Navbar, SubBar } from '../StyledComponents/Navbar';

export const Header = ({ toggleTheme }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isLight, setIsLight] = useState(true);
  const theme = useContext(ThemeContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const changeTheme = () => {
    toggleTheme();
    setIsLight(!isLight);
  };

  return (
    <header>
      <Navbar theme={theme}>
        <GameController size="25" />
        <div>
          <a>Games</a>
          {isLight ? (
            <Sun onClick={changeTheme} size="25" />
          ) : (
            <FullSun onClick={changeTheme} size="25" />
          )}
        </div>
      </Navbar>
      <SubBar user={user}>
        <p>{user && user.username}</p>
        <UserCircle size="25" />
        <LogOut size="25" onClick={handleLogout} />
      </SubBar>
    </header>
  );
};
