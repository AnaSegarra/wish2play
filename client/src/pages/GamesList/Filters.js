// dependencies
import React, { useContext } from 'react';
import Select from 'react-select';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { fetchGames } from '../../services/gamesService';
import { groupFilters } from '../../helpers/filters';

// styled components
import { Input } from '../../styles/Form';
import { FiltersContainer } from '../../styles/Games.styled';

export const Filters = ({
  setGames,
  searchTerm,
  setSearchTerm,
  setTotalGames,
  setCurrentPage,
  filters,
  setFilters,
  options,
  sortBy,
  setSortBy
}) => {
  const fields = 'name image genres totalRating'; //query to receive only these fields
  const numOfResults = 9; // num of games to receive
  const theme = useContext(ThemeContext);

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
    const { value } = e.target;
    const { results } = await fetchGames(numOfResults, fields, value, '', searchTerm, filters);
    setSortBy(value);
    setGames(results);
    setCurrentPage(1);
  };

  return (
    <FiltersContainer>
      <Input
        onChange={e => search(e.target.value)}
        placeholder="Search for games"
        className="search-bar"
      />
      <Select
        options={options}
        isMulti
        onChange={handleSelect}
        classNamePrefix="react-select"
        className="react-select-container"
        theme={theme}
      />
      <FormControl component="fieldset">
        <RadioGroup aria-label="sort" name="sort" value={sortBy} onChange={handleSort}>
          <FormControlLabel value="-releaseYear" control={<Radio />} label="What's new" />
          <FormControlLabel
            value="-totalRating"
            control={<Radio />}
            label="Highest rating to lowest"
          />
        </RadioGroup>
      </FormControl>
    </FiltersContainer>
  );
};
