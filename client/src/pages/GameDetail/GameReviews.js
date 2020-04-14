// dependencies
import React, { useContext } from 'react';
import { Rating } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import ScrollAnimation from 'react-animate-on-scroll';
import { TrashAlt, EditAlt } from '@styled-icons/boxicons-solid';
// styled components
import { ReviewsContainer, Review } from '../../styledComponents/GameDetail.styled';
import { AuthContext } from '../../contexts/authContext';
import { deleteReview } from '../../services/gamesService';

export const GameReviews = ({ reviews, gameID }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async id => {
    console.log('deleting!', gameID, id);
    await deleteReview(gameID, id);
  };

  return (
    <ReviewsContainer elevation={3}>
      <p>Players Reviews</p>
      <Grid container spacing={3}>
        {reviews.map(review => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={review._id}>
              <ScrollAnimation animateIn="fadeIn">
                <Review>
                  {user && user.username === review.author.username && (
                    <div className="btns">
                      <EditAlt size="25" />
                      <TrashAlt size="25" onClick={() => handleDelete(review._id)} />
                    </div>
                  )}
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
