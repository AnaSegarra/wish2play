// dependencies
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowToLeft, ArrowToRight } from '@styled-icons/boxicons-solid';
import { ThemeContext } from 'styled-components';

// local modules
import { fetchGames } from '../services/gamesService';

// styled components
import { StyledSlider, StyledPaper } from '../styles/Home.styled';

export const GamesCarousel = ({ sort }) => {
  const theme = useContext(ThemeContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await fetchGames(5, 'image', sort);
      setGames(results);
    })();
  }, []);

  return games.length === 0 ? (
    <></>
  ) : (
    <StyledPaper elevation={3}>
      <Link to="/games">
        <p className="paper-title">{sort === '-totalRating' ? 'Top rated' : 'Newest releases'}</p>
      </Link>
      <StyledSlider
        centerMode={true}
        adaptiveHeight={true}
        slidesToShow={3}
        centerPadding={0}
        prevArrow={
          <button className="carousel-arrow carousel-prev button">
            <ArrowToLeft size={30} />
          </button>
        }
        nextArrow={
          <button className="carousel-arrow carousel-next button">
            <ArrowToRight size={30} />
          </button>
        }
        theme={theme}>
        {games.map((game, i) => {
          return (
            <div key={i}>
              <Link to={`/games/${game._id}`}>
                <img src={game.image} height="300" />
              </Link>
            </div>
          );
        })}
      </StyledSlider>
    </StyledPaper>
  );
};
