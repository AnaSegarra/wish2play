import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export const Header = () => {
  const { user } = useContext(AuthContext);
  console.log('en el header', user);
  return (
    <header>
      <nav>
        <p>Hello, {(user && user.username) || 'visitor'}!</p>
        <a>🎮</a>
        <a>Games</a>
      </nav>
    </header>
  );
};
