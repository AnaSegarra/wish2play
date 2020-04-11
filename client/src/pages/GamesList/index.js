// dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Container, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

// local modules
import { fetchGames, fetchFilterOptions } from '../../services/gamesService';
import { formatOptions, groupFilters } from '../../helpers/filters';
import { GameCard } from '../../components/GameCard';
import { Filters } from './Filters';

export const GameList = () => {
  // recurrent variables
  const fields = 'name image genres totalRating'; //query to receive only these fields
  const numOfResults = 9;
  const ESRB = [
    { group: 'ESRB', value: 'E', label: 'E' },
    { group: 'ESRB', value: 'E 10+', label: 'E 10+' },
    { group: 'ESRB', value: 'T', label: 'T' },
    { group: 'ESRB', value: 'M', label: 'M' },
    { group: 'ESRB', value: 'A', label: 'A' }
  ];

  // state
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [groupedOptions, setGroupedOptions] = useState([{ label: 'ESRB', options: ESRB }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    (async () => {
      const { results, total } = await fetchGames(numOfResults, fields);
      const { genres, platforms } = await fetchFilterOptions();
      const genresOptions = formatOptions(genres, 'genres');
      const platformOptions = formatOptions(platforms, 'platforms');

      setGroupedOptions([
        ...groupedOptions,
        { label: 'Genres', options: genresOptions },
        { label: 'Platforms', options: platformOptions }
      ]);

      setGames(results);
      setTotalGames(total);
    })();
  }, []);

  const paginate = async (e, page) => {
    console.log('go to page', page);
    const { results } = await fetchGames(numOfResults, fields, sortBy, page, searchTerm, filters);
    setGames(results);
    setCurrentPage(page);
  };

  const search = async term => {
    const { results, total } = await fetchGames(numOfResults, fields, '', '', term, filters);
    setGames(results);
    setSearchTerm(term);
    setTotalGames(total);
    setCurrentPage(1);
  };

  const handleSelect = async filters => {
    const genres = groupFilters(filters, 'genres');
    const platforms = groupFilters(filters, 'platforms');
    const ESRB = groupFilters(filters, 'ESRB');

    const { results, total } = await fetchGames(numOfResults, fields, sortBy, '', searchTerm, {
      genres,
      platforms,
      ESRB
    });
    setGames(results);
    setTotalGames(total);
    setFilters({ genres, platforms, ESRB });
    setCurrentPage(1);
  };

  const handleSort = async e => {
    const { name, checked } = e.target;
    const sortCondition = checked ? [...sortBy, name] : sortBy.filter(el => el !== name);

    const { results } = await fetchGames(
      numOfResults,
      fields,
      sortCondition,
      '',
      searchTerm,
      filters
    );
    setSortBy(sortCondition);
    setGames(results);
    setCurrentPage(1);
  };
  return (
    <Container>
      <Filters search={search} options={groupedOptions} handleSelect={handleSelect} />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox name="-releaseYear" checked={sortBy.releaseYear} onChange={handleSort} />
          }
          label="What's new"
        />
        <FormControlLabel
          control={
            <Checkbox name="-totalRating" checked={sortBy.totalRating} onChange={handleSort} />
          }
          label="Highest rating to lowest"
        />
      </FormGroup>
      <Grid container spacing={4}>
        {games.length === 0 ? (
          <p>Loading...</p>
        ) : (
          games.map((game, i) => {
            return <GameCard {...game} key={i} />;
          })
        )}
      </Grid>
      <Pagination
        count={Math.ceil(totalGames / numOfResults)}
        onChange={paginate}
        page={currentPage}
      />
    </Container>
  );
};
