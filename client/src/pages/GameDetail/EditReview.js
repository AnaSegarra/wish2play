import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { editReview } from '../../services/gamesService';
import { Rating } from '@material-ui/lab';
import { Textarea } from '../../styles/GameDetail.styled';
import { useStyles } from '../Home/Signup';
import { ThemeContext } from 'styled-components';

export const EditReviewForm = ({ open, handleClose, gameID, review, updateGame }) => {
  const [edittedReview, setEdittedReview] = useState({ ...review });
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  const handleSubmit = async e => {
    e.preventDefault();
    const game = await editReview(gameID, edittedReview._id, edittedReview);
    updateGame(game);
    setEdittedReview({ content: '', rating: 0 });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.title}>
        Edit your review
      </DialogTitle>
      <DialogContent className={classes.paragraph}>
        <form onSubmit={handleSubmit} id="edit-form" style={{ padding: '1.3em' }}>
          <Rating
            name="edit-rating"
            value={edittedReview.rating}
            onChange={(e, newValue) => {
              setEdittedReview({ ...edittedReview, rating: newValue });
            }}
            precision={0.5}
          />
          <Textarea
            name="content"
            value={edittedReview.content}
            rows="7"
            style={{ width: '100%', resize: 'none' }}
            onChange={e => setEdittedReview({ ...edittedReview, content: e.target.value })}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={classes.btn}>
          Cancel
        </Button>
        <Button onClick={handleClose} className={classes.btn} type="submit" form="edit-form">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
