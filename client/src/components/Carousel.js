// dependencies
import React, { useState, useEffect } from 'react';
import { ArrowToLeft, ArrowToRight } from '@styled-icons/boxicons-solid';

// local modules
import { fetchGames } from '../services/gamesService';

// styled components
import { StyledSlider, StyledPaper } from '../StyledComponents/Home.styled';

export const GamesCarousel = ({ sort }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await fetchGames(5, 'image', sort);
      console.log('en el carousel ', results);
      setGames(results);
    })();
  }, []);

  return games.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <StyledPaper elevation={3}>
      <p className="paper-title">{sort === '-totalRating' ? 'Top rated' : 'Newest releases'}</p>
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
        }>
        {games.map((game, i) => {
          return (
            <div key={i}>
              <img src={game.image} height="300" />
            </div>
          );
        })}
      </StyledSlider>
    </StyledPaper>
  );
};
