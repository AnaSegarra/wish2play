// dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ThemeContext } from 'styled-components';

// local modules
import { BottomCard, TopCard } from '../StyledComponents/Games.styled';

const useStyles = makeStyles(theme => ({
  chip: theme => ({
    backgroundColor: theme.chip.background,
    margin: '0 .5em',
    color: theme.main.tertiary
  })
}));

export const GameCard = ({ name, image, _id, genres, totalRating }) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  return (
    <Grid item xs={4}>
      <Card elevation={3}>
        <CardActionArea>
          <CardMedia style={{ height: 500 }} image={image} title="Contemplative Reptile" />
          <CardContent>
            <TopCard>
              <p>{name}</p>
              <Rating name="half-rating-read" value={totalRating} readOnly precision={0.5} />
            </TopCard>
          </CardContent>
        </CardActionArea>
        <BottomCard theme={theme}>
          <div>
            {genres.map((genre, i) => (
              <Chip key={i} label={genre} className={classes.chip} />
            ))}
          </div>
          <Link to={`/games/${_id}`}>See details</Link>
        </BottomCard>
      </Card>
    </Grid>
  );
};
