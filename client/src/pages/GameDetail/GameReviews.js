import React, { useContext } from 'react';
import { Rating } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { ReviewsContainer, Review } from '../../StyledComponents/GameDetail.styled';
import { ThemeContext } from 'styled-components';

export const GameReviews = ({ reviews }) => {
  const theme = useContext(ThemeContext);

  return (
    <ReviewsContainer elevation={3}>
      <p>Players Reviews</p>
      <Grid container spacing={3}>
        {reviews.map((review, i) => {
          return (
            <Grid item xs={3} key={i}>
              <Review>
                <div className="stats">
                  <p>{review.author.username}</p>
                  <Rating
                    name="half-rating-read"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                </div>
                <p>{review.content}</p>
              </Review>
            </Grid>
          );
        })}
      </Grid>
    </ReviewsContainer>
  );
};
