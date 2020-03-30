// dependencies
import React, { useContext } from 'react';
import { GameController } from '@styled-icons/entypo';

// local modules
import { AuthContext } from '../contexts/authContext';

// styled components
import { Navbar } from '../StyledComponents/Navbar';

export const Header = () => {
  const { user } = useContext(AuthContext);
  console.log('en el header', user);
  return (
    <header>
      <Navbar>
        <GameController size="25" />
        <a>Games</a>
      </Navbar>
    </header>
  );
};
