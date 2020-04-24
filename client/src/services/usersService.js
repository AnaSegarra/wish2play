import axios from 'axios';

const usersService = axios.create({
  baseURL: `${process.env.API_URL}/users`,
  withCredentials: true
});

export const addGamePlayed = async game_id => {
  const { data } = await usersService.post('/games-played', { game_id });

  return data.userUpdated;
};

export const removeGamePlayed = async game_id => {
  const { data } = await usersService.delete(`/games-played/${game_id}`);
  return { user: data.userUpdated, game: data.game };
};

export const fetchGamesPlayedList = async user_id => {
  const { data } = await usersService.get(`/${user_id}/games-played`);
  return { games: data.gamesPlayed, user: data.user };
};

// friends related endpoints
export const fetchUsers = async (searchTerm, page) => {
  const params = {
    searchTerm,
    page
  };
  const { data } = await usersService.get('/', { params });
  return { users: data.users, total: data.total };
};

export const fetchFriends = async page => {
  const { data } = await usersService.get('/friends', { params: { page } });
  return { friends: data.friends, totalFriends: data.total };
};

export const addFriend = async user_id => {
  const { data } = await usersService.post('/friends', { user_id });
  return data.userUpdated;
};

export const removeFriend = async user_id => {
  const { data } = await usersService.delete(`/friends/${user_id}`);
  return data.userUpdated;
};

export const fetchSingleUser = async username => {
  const { data } = await usersService.get(`/${username}`);
  return data.user;
};
