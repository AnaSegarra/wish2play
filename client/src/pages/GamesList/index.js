import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { fetchGames } from '../../services/gamesService';
import { GameCard } from '../../components/GameCard';

export const GameList = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await fetchGames(9, 'image name');
      console.log('en la página de games', results);
      setGames(results);
    })();
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        {games.length === 0 ? (
          <p>Loading...</p>
        ) : (
          games.map(game => {
            return <GameCard {...game} />;
          })
        )}
      </Grid>
    </Container>
  );
};
