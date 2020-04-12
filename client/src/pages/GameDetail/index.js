import React, { useState, useEffect } from 'react';
import { fetchSingleGame } from '../../services/gamesService';
import { Container, Grid } from '@material-ui/core';
import { GameContent } from './GameContent';
import { GameReviews } from './GameReviews';
import { BSO } from './GameBSO';

export const Game = props => {
  const { id } = props.match.params;
  const [game, setGame] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchSingleGame(id);
      setGame(response);
    })();
  }, []);

  return game ? (
    <Container>
      <Grid container>
        <Grid item xs={12} lg={9}>
          <GameContent {...game} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <BSO name={game.name} />
        </Grid>
      </Grid>
      <GameReviews reviews={game.reviews} />
    </Container>
  ) : (
    <div></div>
  );
};
