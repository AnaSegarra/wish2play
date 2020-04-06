import axios from 'axios';

const authService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth',
  withCredentials: true
});

export const signup = async ({ username, password }) => {
  console.log('creating user with data ', username, password);
  try {
    const { data } = await authService.post('/signup', {
      username,
      password
    });

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const login = async ({ username, password }) => {
  try {
    const { data } = await authService.post('/login', { username, password });

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const logout = async () => {
  await authService.post('/logout');
};

export const getCurrentUser = async () => {
  const { data } = await authService.get('/current-user');

  return data.user;
};
