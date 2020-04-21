// dependencies
import React from 'react';
import { Snackbar, Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
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

export const ConfirmationDelete = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <p>This action will have irreversible consequences. Do you confirm?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
