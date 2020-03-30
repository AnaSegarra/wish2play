import axios from 'axios';

const authService = axios.create({
  baseURL: `${process.env.API_URL}/auth`,
  withCredentials: true
});

export const signup = async ({ username, password }) => {
  console.log('creating user with data ', username, password);
  try {
    const { data } = await authService.post('/signup', {
      username,
      password
    });
    console.log('la respuesta del server al signup', data);
    return data.user;
  } catch (error) {
    console.log('un error de signup', error);
  }
};

export const login = async ({ username, password }) => {
  console.log('loggin user with data ', username, password);
  try {
    const response = await authService.post('/login', { username, password });
    console.log('la respuesta del server al login', response);
  } catch (error) {
    console.log('un error de login', error);
  }
};

export const getCurrentUser = async () => {
  const { data } = await authService.get('/current-user');

  console.log('la respuesta del server al get current-user', data);
  return data.user;
};
