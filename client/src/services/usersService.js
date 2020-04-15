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

  return data.gamesPlayed;
};

// friends related endpoints
export const searchFriends = async (searchTerm, page, numOfResults) => {
  const params = {
    searchTerm,
    page,
    limit: numOfResults
  };
  const { data } = await usersService.get('/', { params });
  // console.log(data);
  return data.users;
};

export const fetchFriends = async () => {
  const { data } = await usersService.get('/friends');
  // console.log(data);
  return data.friends;
};

export const addFriend = async user_id => {
  const { data } = await usersService.post('/friends', { user_id });
  return data.userUpdated;
};

export const removeFriend = async user_id => {
  const { data } = await usersService.delete(`/friends/${user_id}`);
  return data.userUpdated;
};
