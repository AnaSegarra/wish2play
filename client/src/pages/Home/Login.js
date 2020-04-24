// dependencies
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// local modules
import { login } from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import { Form } from '../../components/CredentialsForm';
import { ErrorMsg } from '../../components/AlertMsg';

export const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState({ isError: false, errorMsg: '' });
  const history = useHistory();

  const handleLogin = async loggedUser => {
    const response = await login(loggedUser);
    if (response.user) {
      setUser(response.user);
      history.push(`/wish2play/@${response.user.username}`);
    } else {
      setError({ isError: true, errorMsg: response });
    }
  };

  return (
    <>
      <Form handleAction={handleLogin} />
      {error.isError && (
        <ErrorMsg
          isError={error.isError}
          handleClose={() => setError({ isError: false, errorMsg: '' })}
          position={{ vertical: 'bottom', horizontal: 'right' }}
          errorMsg={error.errorMsg}
        />
      )}
    </>
  );
};
