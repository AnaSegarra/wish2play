import axios from 'axios';

const gamesService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/games',
  withCredentials: true
});

export const fetchGames = async (numResults, showedFields, sortBy, page, searchTerm, filters) => {
  const params = {
    limit: numResults,
    sort: sortBy,
    fields: showedFields,
    page,
    name: searchTerm,
    genres: filters && filters.genres,
    platforms: filters && filters.platforms
  };
  const { data } = await gamesService.get('/', { params });
  // console.log('qué onda', page);
  // console.log('looking for', searchTerm);
  console.log('los filtritos', filters);
  console.log(data);
  return { results: data.games, total: data.total };
};

export const fetchFilterOptions = async () => {
  const { data } = await gamesService.get('/filters');

  return { platforms: data.platforms, genres: data.genres };
};
