// dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Chip, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ThemeContext } from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';

// local modules
import { BottomCard, TopCard } from '../styles/Games.styled';

export const useStyles = makeStyles(theme => ({
  chip: theme => ({
    backgroundColor: theme.chip.background,
    margin: '0 .5em',
    color: theme.main.tertiary
  }),
  root: theme => ({
    borderColor: theme.main.secondary,
    border: '0.1em solid',
    backgroundColor: theme.main.background,
    color: theme.main.color
  })
}));

export const GameCard = ({ name, image, _id, genres, totalRating }) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  return (
    <Grid item lg={4} md={6} xs={12}>
      <ScrollAnimation animateIn="fadeIn">
        <Card elevation={3} className={classes.root}>
          <CardMedia style={{ height: 500 }} image={image} title={name} />
          <CardContent>
            <TopCard>
              <p>{name}</p>
              <Rating
                name="half-rating-read"
                value={totalRating}
                readOnly
                precision={0.5}
                size="small"
              />
            </TopCard>
          </CardContent>
          <BottomCard theme={theme}>
            <div>
              {genres.map((genre, i) => (
                <Chip key={i} label={genre} className={classes.chip} />
              ))}
            </div>
            <Link to={`/games/${_id}`}>See details</Link>
          </BottomCard>
        </Card>
      </ScrollAnimation>
    </Grid>
  );
};
