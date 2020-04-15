// dependencies
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { signup } from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import { Form } from '../../components/CredentialsForm';
import { ErrorMsg } from '../../components/AlertMsg';

// styled components
import { ModalOpener } from '../../styledComponents/Home.styled';

export const useStyles = makeStyles(theme => ({
  title: theme => ({
    padding: '1em 3.6em',
    backgroundColor: theme.main.button,
    color: '#fffffe'
  }),
  paragraph: {
    margin: 0,
    padding: '1em 2em 0'
  },
  btn: theme => ({
    color: theme.main.button,
    '&:hover': {
      backgroundColor: 'rgba(209, 209, 233, 0.5)'
    }
  })
}));

export const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState({ isError: false, errorMsg: '' });
  const [open, setOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignup = async newUser => {
    const response = await signup(newUser);
    if (response.user) {
      setUser(response.user);
      history.push(`/wish2play/${response.user.username}`);
    } else {
      setError({ ...error, isError: true, errorMsg: response });
    }
  };

  return (
    <div className="mb">
      <p>
        Don't have an account yet? <ModalOpener onClick={handleOpen}>Sign up here!</ModalOpener>
      </p>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" theme={theme}>
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
          <Button onClick={handleClose} className={classes.btn}>
            Cancel
          </Button>
          <Button form="signupForm" type="submit" className={classes.btn}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      {error.isError && (
        <ErrorMsg
          isError={error.isError}
          handleClose={() => setError({ isError: false, errorMsg: '' })}
          position={{ vertical: 'bottom', horizontal: 'center' }}
          errorMsg={error.errorMsg}
        />
      )}
    </div>
  );
};
