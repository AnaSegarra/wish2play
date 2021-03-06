// dependencies
import React, { useContext, useState } from 'react';
import { GameController } from '@styled-icons/entypo';
import { UserCircle, Sun as FullSun } from '@styled-icons/boxicons-solid';
import { LogOut, Sun } from '@styled-icons/boxicons-regular';
import { ThemeContext } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, makeStyles } from '@material-ui/core';

// local modules
import { AuthContext } from '../contexts/authContext';
import { logout } from '../services/authService';

// styled components
import { Navbar, SubBar } from '../styles/Navbar';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export const Header = ({ toggleTheme }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isLight, setIsLight] = useState(true);
  const theme = useContext(ThemeContext);
  const classes = useStyles();

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const changeTheme = () => {
    toggleTheme();
    setIsLight(!isLight);
  };

  return (
    <header theme={theme}>
      <Navbar>
        <Link to="/">
          <GameController size="25" />
        </Link>
        <div>
          <NavLink to="/games" exact activeClassName="selected">
            Games
          </NavLink>
          {user && (
            <NavLink
              to={!user.isAdmin ? '/games/request' : '/admin/request'}
              activeClassName="selected">
              Requests
            </NavLink>
          )}
          {isLight ? (
            <Sun onClick={changeTheme} size="25" />
          ) : (
            <FullSun onClick={changeTheme} size="25" />
          )}
        </div>
      </Navbar>
      <SubBar user={user}>
        <Link to={user && !user.isAdmin ? `/wish2play/@${user.username}` : '/admin'}>
          <span>{user && user.username}</span>
          {user && user.image ? (
            <Avatar alt={user.username} src={user.image} className={classes.small} />
          ) : (
            <UserCircle size="25" />
          )}
        </Link>
        <LogOut size="25" onClick={handleLogout} />
      </SubBar>
    </header>
  );
};
