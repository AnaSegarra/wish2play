// dependencies
import React, { useContext } from 'react';
import { GameController } from '@styled-icons/entypo';
import { UserCircle } from '@styled-icons/boxicons-solid';
import { LogOut } from '@styled-icons/boxicons-regular';

// local modules
import { AuthContext } from '../contexts/authContext';
import { logout } from '../services/authService';

// styled components
import { Navbar, SubBar } from '../StyledComponents/Navbar';

export const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <header>
      <Navbar>
        <GameController size="25" />
        <a>Games</a>
      </Navbar>
      <SubBar user={user}>
        <p>{user && user.username}</p>
        <UserCircle size="25" />
        <LogOut size="25" onClick={handleLogout} />
      </SubBar>
    </header>
  );
};
