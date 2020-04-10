import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { fetchGames, fetchFilterOptions } from '../../services/gamesService';
import { GameCard } from '../../components/GameCard';
import Pagination from '@material-ui/lab/Pagination';
import { Input } from '../../StyledComponents/Form';
import Select from 'react-select';
import { formatOptions, groupFilters } from '../../helpers/filters';

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [groupedOptions, setGroupedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fields = 'name image genres totalRating';

  useEffect(() => {
    (async () => {
      const { results, total } = await fetchGames(9, fields);
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
    const { results } = await fetchGames(9, fields, '', page, searchTerm, filters);
    setGames(results);
    setCurrentPage(page);
  };

  const search = async term => {
    console.log('searching!', term);
    const { results, total } = await fetchGames(9, fields, '', '', term, filters);
    setGames(results);
    setSearchTerm(term);
    setTotalGames(total);
    setCurrentPage(1);
  };

  const handleSelect = async filters => {
    const genres = groupFilters(filters, 'genres');
    const platforms = groupFilters(filters, 'platforms');

    const { results, total } = await fetchGames(9, fields, '', '', searchTerm, {
      genres,
      platforms
    });
    setGames(results);
    setTotalGames(total);
    setFilters({ genres, platforms });
    setCurrentPage(1);
  };

  return (
    <Container>
      <Input onChange={e => search(e.target.value)} placeholder="Search for games" />
      <Select options={groupedOptions} isMulti onChange={handleSelect} />
      <Grid container spacing={4}>
        {games.length === 0 ? (
          <p>Loading...</p>
        ) : (
          games.map((game, i) => {
            return <GameCard {...game} key={i} />;
          })
        )}
      </Grid>
      <Pagination count={Math.ceil(totalGames / 9)} onChange={paginate} page={currentPage} />
    </Container>
  );
};
