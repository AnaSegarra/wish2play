// dependencies
import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { GameForm } from './GameForm';
import { addGame } from '../services/gamesService';

// styled components
import { useStyles } from '../pages/Home/Signup';

export const GameEditForm = ({
  open,
  closeEditForm,
  game,
  setUpdatedGame,
  request,
  requestID,
  isEditing,
  allRequests,
  updateRequest,
  handleAction = addGame
}) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  return (
    <Dialog open={open} onClose={closeEditForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.title}>
        {request ? "User's request" : 'Edit game'}
      </DialogTitle>
      <DialogContent>
        <GameForm
          gameToEdit={game}
          handleAction={handleAction}
          setUpdatedGame={setUpdatedGame}
          request={request}
          requestID={requestID}
          isEditing={isEditing}
          allRequests={allRequests}
          updateRequest={updateRequest}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditForm} className={classes.btn}>
          Cancel
        </Button>
        <Button className={classes.btn} type="submit" form="edit-form" onClick={closeEditForm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
