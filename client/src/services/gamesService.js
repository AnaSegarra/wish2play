import axios from 'axios';

const gamesService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/games',
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

export const addReview = async (game_id, { content, rating }) => {
  const { data } = await gamesService.post(`/${game_id}/reviews`, { content, rating });
  return data.game;
};

export const deleteReview = async (game_id, id) => {
  const response = await gamesService.delete(`/${game_id}/reviews/${id}`);
  console.log('respuesta', response);
};
