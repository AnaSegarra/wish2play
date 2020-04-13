// dependencies
import React, { useState, useEffect } from 'react';

// local modules
import { fetchGamesPlayedList } from '../../services/usersService';

export const GamesPlayedPreview = ({ userID }) => {
  const [gamesPlayed, setGamesPlayed] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('getting games');

      const games = await fetchGamesPlayedList(userID);

      setGamesPlayed(games);
    })();
  }, []);
  return (
    <div>
      <p>El perfil del usuario</p>
      <p>Los juegos jugados</p>
      {gamesPlayed.length > 0 &&
        gamesPlayed.map(game => {
          return <p>{game.name}</p>;
        })}
    </div>
  );
};
