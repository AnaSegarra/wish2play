// dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Chip } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { CardTitle, BottomCard } from '../StyledComponents/Games.styled';

export const GameCard = ({ name, image, _id, genres }) => {
  const theme = useContext(ThemeContext);
  console.log('los géneros', genres);
  return (
    <Grid item xs={4}>
      <Card elevation={3}>
        <CardActionArea>
          <CardMedia style={{ height: 500 }} image={image} title="Contemplative Reptile" />
          <CardContent>
            <CardTitle>{name}</CardTitle>
          </CardContent>
        </CardActionArea>
        <BottomCard theme={theme}>
          <div>
            {genres.map(genre => (
              <Chip label={genre} />
            ))}
          </div>
          <Link to={`/games/${_id}`}>See details</Link>
        </BottomCard>
      </Card>
    </Grid>
  );
};
