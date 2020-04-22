// dependencies
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { fetchGamesPlayedList } from '../../services/usersService';
import { AuthContext } from '../../contexts/authContext';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { Card } from '../../styles/Games.styled';

const GamesPlayed = () => {
  const { id } = useParams();
  const { user, isLoading } = useContext(AuthContext);
  const theme = useContext(ThemeContext);
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
        {user && user.username === owner ? (
          "Games you've played"
        ) : owner ? (
          `Games played by ${owner}`
        ) : (
          <></>
        )}
      </h2>
      <Grid container spacing={3}>
        {playedList.length > 0 &&
          playedList.map((game, i) => {
            return (
              <Grid item lg={3} key={i}>
                <StyledPaper elevation={3}>
                  <Card theme={theme}>
                    <Link to={`/games/${game._id}`}>{game.name}</Link>
                    <div>
                      <img src={game.image} />
                    </div>
                  </Card>
                </StyledPaper>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export const ProtectedGamesPlayed = withProtectedRoute(GamesPlayed);
