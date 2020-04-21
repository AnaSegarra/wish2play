// dependencies
import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const ErrorMsg = ({ isError, handleClose, position, errorMsg }) => {
  return (
    <Snackbar open={isError} autoHideDuration={4000} onClose={handleClose} anchorOrigin={position}>
      <Alert severity="error">{errorMsg}</Alert>
    </Snackbar>
  );
};

export const SuccessMsg = ({ msg, handleClose }) => {
  return (
    <Snackbar open={msg ? true : false} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        position={{ vertical: 'bottom', horizontal: 'center' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};
