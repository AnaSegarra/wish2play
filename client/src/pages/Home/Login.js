// dependencies
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// local modules
import { login } from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import { Form } from '../../components/CredentialsForm';

export const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState({ isError: false, errorMsg: '' });
  const history = useHistory();

  const handleLogin = async loggedUser => {
    const response = await login(loggedUser);
    if (response.user) {
      setUser(response.user);
      history.push(`/wish2play/${response.user.username}`);
    } else {
      setError({ ...error, isError: true, errorMsg: response });
    }
  };

  return (
    <>
      <Form handleAction={handleLogin} />
      {error.isError && (
        <Snackbar
          open={error.isError}
          autoHideDuration={4000}
          onClose={() => setError({ ...error, isError: false, errorMsg: '' })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="error">{error.errorMsg}</Alert>
        </Snackbar>
      )}
    </>
  );
};
