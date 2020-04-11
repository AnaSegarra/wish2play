import React, { useContext } from 'react';
import { Rating } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { ReviewsContainer, Review } from '../../StyledComponents/GameDetail.styled';
import ScrollAnimation from 'react-animate-on-scroll';

export const GameReviews = ({ reviews }) => {
  return (
    <ReviewsContainer elevation={3}>
      <p>Players Reviews</p>
      <Grid container spacing={3}>
        {reviews.map((review, i) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={i}>
              <ScrollAnimation animateIn="fadeIn">
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
              </ScrollAnimation>
            </Grid>
          );
        })}
      </Grid>
    </ReviewsContainer>
  );
};
