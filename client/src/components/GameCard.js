// dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { CardTitle, LinkContainer } from '../StyledComponents/Games.styled';

export const GameCard = ({ name, image, _id }) => {
  const theme = useContext(ThemeContext);

  return (
    <Grid item xs={4}>
      <Card elevation={3}>
        <CardActionArea>
          <CardMedia style={{ height: 500 }} image={image} title="Contemplative Reptile" />
          <CardContent>
            <CardTitle>{name}</CardTitle>
          </CardContent>
        </CardActionArea>
        <LinkContainer theme={theme}>
          <Link to={`/games/${_id}`}>See details</Link>
        </LinkContainer>
      </Card>
    </Grid>
  );
};
