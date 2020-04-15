// dependencies
import React, { useState, useEffect } from 'react';

// local modules
import { fetchGamesPlayedList } from '../../services/usersService';
import { GamesGrid } from '../../components/GamesGrid';

export const GamesPlayedPreview = ({ userID }) => {
  const [gamesPlayed, setGamesPlayed] = useState([]);

  const firstFive = gamesPlayed.slice(0, 5);

  useEffect(() => {
    (async () => {
      const games = await fetchGamesPlayedList(userID);

      setGamesPlayed(games);
    })();
  }, []);
  return <>{gamesPlayed.length > 0 && <GamesGrid gamesArr={firstFive} />}</>;
};
