import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { fetchGames } from '../../services/gamesService';
import { GameCard } from '../../components/GameCard';
import Pagination from '@material-ui/lab/Pagination';

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState();

  useEffect(() => {
    (async () => {
      const { results, total } = await fetchGames(9, 'image name');
      setGames(results);
      setTotalGames(total);
    })();
  }, []);

  const paginate = async (e, page) => {
    console.log('go to page', page);
    const { results } = await fetchGames(9, 'image name', '', page);
    setGames(results);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {games.length === 0 ? (
          <p>Loading...</p>
        ) : (
          games.map((game, i) => {
            return <GameCard {...game} key={i} />;
          })
        )}
      </Grid>
      <Pagination count={Math.ceil(totalGames / 9)} onChange={paginate} />
    </Container>
  );
};
