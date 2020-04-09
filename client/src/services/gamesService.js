import axios from 'axios';

const gamesService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/games',
  withCredentials: true
});

export const fetchGames = async (numResults, showedFields, sortBy) => {
  const params = { limit: numResults, sort: sortBy, fields: showedFields };
  const { data } = await gamesService.get('/', { params });
  console.log(data);
  return data.games;
};
