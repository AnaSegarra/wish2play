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

export const fetchGamesPlayedList = async user_id => {
  const { data } = await usersService.get(`/${user_id}/games-played`);
  console.log('response en el browser', data);

  return data.gamesPlayed;
};
