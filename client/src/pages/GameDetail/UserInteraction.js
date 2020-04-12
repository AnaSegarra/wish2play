import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { ButtonsContainer } from '../../StyledComponents/GameDetail.styled';
import { Gamepad } from 'styled-icons/remix-fill';
import { Gamepad as GamepadOutlined } from 'styled-icons/remix-line';
import { ThemeContext } from 'styled-components';
import { addGamePlayed } from '../../services/usersService';

export const UserButtons = ({ gameID }) => {
  const { user, setUser } = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  // check if user has played the game
  const isGamePlayed = id => user.gamesPlayed.includes(id);

  // delete game from user's list
  const removeGame = gameID => {
    console.log('removing game', gameID);
  };

  // add game to user's list
  const addGame = async gameID => {
    const updatedUser = await addGamePlayed(gameID);
    console.log('usuario', updatedUser);
    setUser(updatedUser);
  };

  return (
    <ButtonsContainer user={user} theme={theme}>
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
  );
};
