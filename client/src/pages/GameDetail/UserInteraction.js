// dependencies
import React, { useContext } from 'react';
import { Gamepad } from 'styled-icons/remix-fill';
import { Gamepad as GamepadOutlined } from 'styled-icons/remix-line';
import { ThemeContext } from 'styled-components';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { addGamePlayed, removeGamePlayed } from '../../services/usersService';

// styled components
import { ButtonsContainer } from '../../styledComponents/GameDetail.styled';

export const UserButtons = ({ gameID }) => {
  const { user, setUser } = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  // check if user has played the game
  const isGamePlayed = id => user.gamesPlayed.includes(id);

  // delete game from user's list
  const removeGame = async gameID => {
    const updatedUser = await removeGamePlayed(gameID);
    setUser(updatedUser);
  };

  // add game to user's list
  const addGame = async gameID => {
    const updatedUser = await addGamePlayed(gameID);
    setUser(updatedUser);
  };

  return user ? (
    <ButtonsContainer theme={theme}>
      {isGamePlayed(gameID) ? (
        <button onClick={() => removeGame(gameID)}>
          Played it!
          <Gamepad size="25" />
        </button>
      ) : (
        <button onClick={() => addGame(gameID)}>
          Not played yet <GamepadOutlined size="25" />
        </button>
      )}
      <div>otros botones</div>
    </ButtonsContainer>
  ) : (
    <></>
  );
};
