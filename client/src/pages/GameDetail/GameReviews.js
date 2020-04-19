// dependencies
import React, { useContext, useState } from 'react';
import { Rating } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import ScrollAnimation from 'react-animate-on-scroll';
import { TrashAlt, EditAlt } from '@styled-icons/boxicons-solid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { editReview } from '../../services/gamesService';

// styled components
import { ReviewsContainer, Review } from '../../styles/GameDetail.styled';
import { AuthContext } from '../../contexts/authContext';
import { deleteReview } from '../../services/gamesService';
import { ConfirmationDelete } from './GameContent';

export const GameReviews = ({ reviews, gameID, updateGame }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleDelete = async id => {
    console.log('deleting!', gameID, id);
    const response = await deleteReview(gameID, id);
    updateGame(response);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openAlert = () => setAlert(true);
  const closeAlert = () => setAlert(false);

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
                      <EditAlt size="25" onClick={handleOpen} />
                      <EditForm
                        open={open}
                        handleClose={handleClose}
                        gameID={gameID}
                        review={review}
                        updateGame={updateGame}
                      />
                      <TrashAlt size="25" onClick={openAlert} />
                      <ConfirmationDelete
                        open={alert}
                        handleClose={closeAlert}
                        handleDelete={() => handleDelete(review._id)}
                      />
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

const EditForm = ({ open, handleClose, gameID, review, updateGame }) => {
  const [edittedReview, setEdittedReview] = useState({ ...review });

  const handleSubmit = async e => {
    e.preventDefault();
    const game = await editReview(gameID, edittedReview._id, edittedReview);
    updateGame(game);
    setEdittedReview({ content: '', rating: 0 });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit your review</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="edit-form">
          <Rating
            name="edit-rating"
            value={edittedReview.rating}
            onChange={(e, newValue) => {
              setEdittedReview({ ...edittedReview, rating: newValue });
            }}
            precision={0.5}
          />
          <textarea
            name="content"
            value={edittedReview.content}
            rows="7"
            style={{ width: '100%', resize: 'none' }}
            onChange={e =>
              setEdittedReview({ ...edittedReview, content: e.target.value })
            }></textarea>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" type="submit" form="edit-form">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
