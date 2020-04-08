// dependencies
import React, { useContext, useState } from 'react';
import {
  makeStyles,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

// local modules
import { signup } from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import { Form } from '../../components/CredentialsForm';

// styled components
import { ModalOpener } from '../../StyledComponents/Home.styled';

const useStyles = makeStyles({
  title: {
    padding: '1em 3.6em',
    backgroundColor: '#6246ea',
    color: '#fffffe'
  },
  paragraph: {
    margin: 0,
    padding: '1em 2em 0'
  }
});

export const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignup = async newUser => {
    const response = await signup(newUser);

    response.user ? setUser(response.user) : setError(response);
  };

  return (
    <div>
      <p>
        Don't have an account yet? <ModalOpener onClick={handleOpen}>Sign up here!</ModalOpener>
      </p>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Create your account
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.paragraph}>
            Please, enter your username and password. You'll be able to complete your profile later
            on if you wish to have a more personalized space.
          </DialogContentText>
          <Form handleAction={handleSignup} id="signupForm" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" form="signupForm" type="submit">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
