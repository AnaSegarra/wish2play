import axios from 'axios';

const gamesService = axios.create({
  baseURL: `${process.env.API_URL}/games`,
  withCredentials: true
});

export const fetchGames = async (numResults, showedFields, sortBy, page, searchTerm, filters) => {
  const params = {
    limit: numResults,
    fields: showedFields,
    sortBy,
    page,
    name: searchTerm,
    genres: filters && filters.genres,
    platforms: filters && filters.platforms,
    ESRB: filters && filters.ESRB
  };
  const { data } = await gamesService.get('/', { params });

  return { results: data.games, total: data.total };
};

export const fetchFilterOptions = async () => {
  const { data } = await gamesService.get('/filters');
  return { platforms: data.platforms, genres: data.genres, ESRB: data.ESRB };
};

export const fetchSingleGame = async endpoint => {
  const { data } = await gamesService.get(`/${endpoint}`);

  return data;
};

export const addGame = async game => {
  try {
    const { data } = await gamesService.post('/', game);
    console.log('respuesta', data);
    return data.message;
  } catch (error) {
    throw new Error('Error creating a game');
  }
};

export const uploadGameImage = async (image, game) => {
  try {
    const { data } = await gamesService.post(`/upload/${game}`, image);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const updateGame = async (gameUpdated, id) => {
  const { data } = await gamesService.put(`/${id}`, gameUpdated);
  return data.game;
};

export const deleteGameDB = async id => {
  const response = await gamesService.delete(`${id}`);
};

// reviews utilities
export const addReview = async (game_id, { content, rating }) => {
  const { data } = await gamesService.post(`/${game_id}/reviews`, { content, rating });
  return data.game;
};

export const editReview = async (game_id, id, { content, rating }) => {
  const { data } = await gamesService.put(`/${game_id}/reviews/${id}`, { content, rating });
  return data.game;
};

export const deleteReview = async (game_id, id) => {
  const { data } = await gamesService.delete(`/${game_id}/reviews/${id}`);
  return data.game;
};
