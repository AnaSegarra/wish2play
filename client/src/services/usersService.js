import axios from 'axios';

const usersService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/users',
  withCredentials: true
});

export const addGamePlayed = async game_id => {
  console.log('adding game with id of', game_id);
  const { data } = await usersService.post('/games-played', { game_id });
  console.log('games played en el server', data);

  return data.userUpdated;
};
