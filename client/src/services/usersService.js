import axios from 'axios';

const usersService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/users',
  withCredentials: true
});

export const addGamePlayed = async game_id => {
  const { data } = await usersService.post('/games-played', { game_id });

  return data.userUpdated;
};

export const removeGamePlayed = async game_id => {
  const { data } = await usersService.delete(`/games-played/${game_id}`);

  return data.userUpdated;
};
