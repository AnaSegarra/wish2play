import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { fetchGames } from '../../services/gamesService';
import { GameCard } from '../../components/GameCard';
import Pagination from '@material-ui/lab/Pagination';

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState();
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    (async () => {
      const { results, total } = await fetchGames(9, 'image name');
      setGames(results);
      setTotalGames(total);
    })();
  }, []);

  const paginate = async () => {
    console.log('clicked');
    const { results } = await fetchGames(9, 'image name', '', currentPage);
    console.log('pasando página');
    setCurrentPage(prev => (prev += 1));
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
      <Pagination count={Math.ceil(totalGames / 9)} onClick={paginate} />
    </Container>
  );
};
