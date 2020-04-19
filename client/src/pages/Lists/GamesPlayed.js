import React, { useState, useEffect, useContext } from 'react';
import { fetchGamesPlayedList } from '../../services/usersService';
import { Container, Grid } from '@material-ui/core';
import { AuthContext } from '../../contexts/authContext';

import { useParams, Link } from 'react-router-dom';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';

const GamesPlayed = () => {
  const { id } = useParams();
  const { user, isLoading } = useContext(AuthContext);
  const [playedList, setPlayedList] = useState([]);
  const [owner, setOwner] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetchGamesPlayedList(id);
      console.log(response);
      setPlayedList(response.games);
      setOwner(response.user);
    })();
  }, []);

  if (isLoading) return <></>;

  return (
    <Container>
      <h2>
        {user && user.username === owner ? "Games you've played" : `Games played by ${owner}`}
      </h2>
      <Grid container spacing={3}>
        {playedList.length > 0 &&
          playedList.map((game, i) => {
            return (
              <Grid item lg={3} key={i}>
                <Link to={`/games/${game._id}`}>{game.name}</Link>
                <img src={game.image} height="300" />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export const ProtectedGamesPlayed = withProtectedRoute(GamesPlayed);
