// dependencies
import React, { useContext, useState } from 'react';
import { Rating } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import ScrollAnimation from 'react-animate-on-scroll';
import { TrashAlt, EditAlt } from '@styled-icons/boxicons-solid';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { deleteReview } from '../../services/gamesService';
import { ConfirmationDelete } from '../../components/AlertMsg';
import { EditReviewForm } from './EditReview';

// styled components
import { Review } from '../../styles/GameDetail.styled';
import { StyledPaper } from '../../styles/Home.styled';
import { usePaperStyles } from '../../styles/Global';

export const GameReviews = ({ reviews, gameID, updateGame }) => {
  const { user } = useContext(AuthContext);
  const classes = usePaperStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleDelete = async id => {
    const response = await deleteReview(gameID, id);
    updateGame(response);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openAlert = () => setAlert(true);
  const closeAlert = () => setAlert(false);

  return (
    <StyledPaper elevation={3} className={classes.root}>
      <p className="paper-title">Players Reviews</p>
      <Grid container spacing={3} style={{ padding: '2em' }}>
        {reviews.map(review => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={review._id} className="fw">
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
                  {user && user.username === review.author.username && (
                    <div className="btns">
                      <EditAlt size="25" onClick={handleOpen} className="edit" />
                      <EditReviewForm
                        open={open}
                        handleClose={handleClose}
                        gameID={gameID}
                        review={review}
                        updateGame={updateGame}
                      />
                      <TrashAlt size="25" onClick={openAlert} className="delete" />
                      <ConfirmationDelete
                        open={alert}
                        handleClose={closeAlert}
                        handleDelete={() => handleDelete(review._id)}
                      />
                    </div>
                  )}
                </Review>
              </ScrollAnimation>
            </Grid>
          );
        })}
      </Grid>
    </StyledPaper>
  );
};
