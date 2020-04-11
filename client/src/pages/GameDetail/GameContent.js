import React, { useContext } from 'react';
import { Paper, Chip } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ShoppingCart } from 'styled-icons/typicons';
import { Container, ImageContainer, Content } from '../../StyledComponents/GameDetail.styled';
import { useStyles } from '../../components/GameCard';
import { ThemeContext } from 'styled-components';

export const GameContent = props => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  const {
    image,
    name,
    company,
    releaseYear,
    platforms,
    ESRB,
    totalRating,
    linkToBuy,
    description,
    genres
  } = props;
  return (
    <Paper elevation={3}>
      <Container>
        <ImageContainer>
          <img src={image} />
        </ImageContainer>

        <Content theme={theme}>
          <div>
            <p className="title">{name}</p>
            <p className="subtitle">by {company}</p>
          </div>
          <p>{description}</p>
          <div className="stats">
            <div className="data">
              <p>
                Released <span>{releaseYear}</span>
              </p>
              <p>
                Playable on: <span>{platforms.join(', ')}</span>
              </p>
              <p>
                Rated: <span>{ESRB}</span>
              </p>
            </div>
            <div>
              <Rating name="half-rating-read" value={totalRating} readOnly precision={0.5} />
            </div>
          </div>
          <div className="bottom">
            <div>
              {genres.map((genre, i) => (
                <Chip key={i} label={genre} className={classes.chip} />
              ))}
            </div>
            <Chip
              label={'Shop now'}
              component="a"
              target="blank"
              href={linkToBuy}
              clickable
              icon={<ShoppingCart size="15" />}
              className={classes.chip}
            />
          </div>
        </Content>
      </Container>
    </Paper>
  );
};
