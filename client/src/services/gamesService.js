import axios from 'axios';

const gamesService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/games',
  withCredentials: true
});

export const fetchGames = async (numResults, showedFields, sortBy, page) => {
  const params = { limit: numResults, sort: sortBy, fields: showedFields, page };
  const { data } = await gamesService.get('/', { params });
  console.log('qué onda', page);
  console.log(data);
  return { results: data.games, total: data.total };
};
