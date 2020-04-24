// dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// local modules
import { fetchGamesPlayedList } from '../../services/usersService';
import { GamesGrid } from '../../components/GamesGrid';

// styled components
import { ListPlaceholder } from '../../styles/Profile.styled';

export const GamesPlayedPreview = ({ userID, isOwner }) => {
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchGamesPlayedList(userID);

      setGamesPlayed(response.games);
      setLoading(false);
    })();
  }, [userID]);
  return (
    <>
      {gamesPlayed.length > 0 ? (
        <GamesGrid gamesArr={gamesPlayed.slice(0, 5)} userID={userID} type="games-played" />
      ) : gamesPlayed.length === 0 && !isLoading ? (
        <ListPlaceholder>
          {isOwner() ? (
            <>
              <p>Have you played any games?</p>
              <Link to="/games">Check it out</Link>
            </>
          ) : (
            <p>Haven't played any games yet</p>
          )}
        </ListPlaceholder>
      ) : (
        <></>
      )}
    </>
  );
};
