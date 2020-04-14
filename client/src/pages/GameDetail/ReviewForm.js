import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { isGameIncluded } from '../../helpers/gameCheckers';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';
import { ReviewsContainer } from '../../styledComponents/GameDetail.styled';
import { Rating } from '@material-ui/lab';
import { addReview } from '../../services/gamesService';

export const SubmitBtn = styled.button`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const ReviewForm = ({ gameID, updateGame }) => {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState({ content: '', rating: 0 });

  const handleSubmit = async e => {
    e.preventDefault();
    const game = await addReview(gameID, review);
    updateGame(game);
    setReview({ content: '', rating: 0 });
  };

  return (
    <>
      {user && (
        <ReviewsContainer>
          <p>Share your thoughts with other players</p>
          <form onSubmit={handleSubmit}>
            <Rating
              name="rating"
              value={review.rating}
              onChange={(e, newValue) => {
                setReview({ ...review, rating: newValue });
              }}
              precision={0.5}
              disabled={!isGameIncluded(gameID, user.gamesPlayed)}
            />
            <textarea
              name="content"
              value={review.content}
              rows="7"
              style={{ width: '100%', resize: 'none' }}
              onChange={e => setReview({ ...review, content: e.target.value })}
              placeholder="Did you like it? Would you recommend it?"
              disabled={!isGameIncluded(gameID, user.gamesPlayed)}></textarea>
            <Tooltip
              title={
                !isGameIncluded(gameID, user.gamesPlayed)
                  ? 'You have to play it before making a review'
                  : ''
              }>
              <span>
                <SubmitBtn type="submit" disabled={!isGameIncluded(gameID, user.gamesPlayed)}>
                  Publish
                </SubmitBtn>
              </span>
            </Tooltip>
          </form>
        </ReviewsContainer>
      )}
    </>
  );
};