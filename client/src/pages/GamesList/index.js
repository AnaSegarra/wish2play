// dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

// local modules
import { fetchGames, fetchFilterOptions } from '../../services/gamesService';
import { formatOptions } from '../../helpers/filters';
import { GameCard } from '../../components/GameCard';
import { Filters } from './Filters';

// styled components
import { StyledPagination, EmptyList } from '../../styles/Games.styled';

export const GameList = () => {
  // recurrent variables
  const fields = 'name image genres totalRating'; //query to receive only these fields
  const numOfResults = 9;

  // state
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [groupedOptions, setGroupedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    (async () => {
      const { results, total } = await fetchGames(numOfResults, fields);
      const { genres, platforms, ESRB } = await fetchFilterOptions();
      const ESRBOptions = formatOptions(ESRB, 'ESRB');
      const genresOptions = formatOptions(genres, 'genres');
      const platformOptions = formatOptions(platforms, 'platforms');

      setGroupedOptions([
        { label: 'ESRB', options: ESRBOptions },
        { label: 'Genres', options: genresOptions },
        { label: 'Platforms', options: platformOptions }
      ]);

      setGames(results);
      setTotalGames(total);
    })();
  }, []);

  const paginate = async (e, page) => {
    const { results } = await fetchGames(numOfResults, fields, sortBy, page, searchTerm, filters);
    setGames(results);
    setCurrentPage(page);

    window.scrollTo(0, 0); // scrolls back to top after changing page
  };

  // check wether user is searching by name or filtering
  const isSearching = () => {
    const setFilters = Object.values(filters).some(group => group.length !== 0);
    return searchTerm || setFilters;
  };

  return (
    <Container>
      <Filters
        setGames={setGames}
        setTotalGames={setTotalGames}
        setCurrentPage={setCurrentPage}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        options={groupedOptions}
        sortBy={sortBy}
        searchTerm={searchTerm}
        setSortBy={setSortBy}
      />

      <Grid container spacing={4}>
        {games.length > 0 ? (
          games.map((game, i) => {
            return <GameCard {...game} key={i} />;
          })
        ) : games.length === 0 && isSearching() ? (
          <EmptyList>
            <div>
              <p>No results found</p>
              <p>
                You can fill in a request for this game <Link to="/games/request">here</Link>
              </p>
            </div>
          </EmptyList>
        ) : (
          <></>
        )}
      </Grid>
      {totalGames > 0 && (
        <StyledPagination
          count={Math.ceil(totalGames / numOfResults)}
          onChange={paginate}
          page={currentPage}
        />
      )}
    </Container>
  );
};
