import axios from 'axios';

const authService = axios.create({
  baseURL: `${process.env.API_URL}/auth`,
  withCredentials: true
});

export const signup = async ({ username, password }) => {
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
  const response = await authService.post('/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const { data } = await authService.get('/current-user');
  return data.user;
};

export const updateProfile = async newData => {
  try {
    const { data } = await authService.put('/edit', newData);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const uploadImage = async img => {
  try {
    const { data } = await authService.put('/upload', img);
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error('You need to choose a picture');
    }
    if (error.response.status === 500) {
      throw new Error('File format not allowed');
    }
  }
};
