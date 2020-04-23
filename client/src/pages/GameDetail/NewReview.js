// dependencies
import React, { useContext, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

// local modules
import { addReview } from '../../services/gamesService';
import { AuthContext } from '../../contexts/authContext';
import { isIncluded } from '../../helpers/listsHelpers';

// styled components
import { ReviewsContainer, BtnSpan, Textarea } from '../../styles/GameDetail.styled';
import { Button } from '../../styles/Form';
import { usePaperStyles } from '../../styles/Global';

export const NewReview = ({ gameID, updateGame, reviews }) => {
  const { user } = useContext(AuthContext);
  const classes = usePaperStyles();
  const [review, setReview] = useState({ content: '', rating: 0 });

  const handleSubmit = async e => {
    e.preventDefault();
    const game = await addReview(gameID, review);
    updateGame(game);
    setReview({ content: '', rating: 0 });
  };

  return (
    <>
      {user && !user.isAdmin && (
        <ReviewsContainer className={classes.root}>
          <p className="paper-title">Share your thoughts with other players</p>
          <form onSubmit={handleSubmit}>
            <Rating
              name="rating"
              value={review.rating}
              onChange={(e, newValue) => {
                setReview({ ...review, rating: newValue });
              }}
              precision={0.5}
              disabled={
                !isIncluded(gameID, user.gamesPlayed) ||
                reviews.some(review => review.author.username === user.username)
              }
            />
            <div className="txt-container">
              <Textarea
                name="content"
                value={review.content}
                rows="7"
                style={{ width: '100%' }}
                onChange={e => setReview({ ...review, content: e.target.value })}
                placeholder="Did you like it? Would you recommend it?"
                disabled={
                  !isIncluded(gameID, user.gamesPlayed) ||
                  reviews.some(review => review.author.username === user.username)
                }
                required
              />
            </div>

            <Tooltip
              title={
                !isIncluded(gameID, user.gamesPlayed)
                  ? 'You have to play it before making a review'
                  : reviews.some(review => review.author.username === user.username)
                  ? 'You should edit or delete your review before posting again'
                  : ''
              }>
              <BtnSpan
                allowed={
                  !isIncluded(gameID, user.gamesPlayed) ||
                  reviews.some(review => review.author.username === user.username)
                }>
                <Button
                  type="submit"
                  disabled={
                    !isIncluded(gameID, user.gamesPlayed) ||
                    reviews.some(review => review.author.username === user.username)
                  }
                  style={
                    !isIncluded(gameID, user.gamesPlayed) ||
                    reviews.some(review => review.author.username === user.username)
                      ? { pointerEvents: 'none' }
                      : {}
                  }>
                  Publish
                </Button>
              </BtnSpan>
            </Tooltip>
          </form>
        </ReviewsContainer>
      )}
    </>
  );
};
