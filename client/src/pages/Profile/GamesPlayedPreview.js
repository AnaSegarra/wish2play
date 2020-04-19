// dependencies
import React, { useState, useEffect } from 'react';

// local modules
import { fetchGamesPlayedList } from '../../services/usersService';
import { GamesGrid } from '../../components/GamesGrid';

export const GamesPlayedPreview = ({ userID }) => {
  const [gamesPlayed, setGamesPlayed] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchGamesPlayedList(userID);

      setGamesPlayed(response.games);
    })();
  }, []);
  return (
    <>
      {gamesPlayed.length > 0 && (
        <GamesGrid gamesArr={gamesPlayed.slice(0, 5)} userID={userID} type="games-played" />
      )}
    </>
  );
};
