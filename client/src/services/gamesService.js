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

  console.log('los filtritos', sortBy);
  console.log(data);
  return { results: data.games, total: data.total };
};

export const fetchFilterOptions = async () => {
  const { data } = await gamesService.get('/filters');

  return { platforms: data.platforms, genres: data.genres };
};
