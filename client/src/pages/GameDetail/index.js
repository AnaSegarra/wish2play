// dependencies
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';

// local modules
import { fetchSingleGame } from '../../services/gamesService';
import { GameContent } from './GameContent';
import { GameReviews } from './GameReviews';
import { ReviewForm } from './ReviewForm';
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
          <GameContent {...game} setUpdatedGame={setGame} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <BSO name={game.name} />
        </Grid>
      </Grid>
      <ReviewForm gameID={game._id} updateGame={setGame} />
      <GameReviews gameID={game._id} reviews={game.reviews} updateGame={setGame} />
    </Container>
  ) : (
    <div></div>
  );
};
