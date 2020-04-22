// dependencies
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { LoaderCircle } from 'styled-icons/boxicons-regular';
import { BadgeCheck } from 'styled-icons/boxicons-solid';

// local modules
import { fetchReservedWishes } from '../../services/wishesService';

// styled componentes
import { StyledPaper } from '../../styles/Home.styled';
import { shortenStr } from '../../helpers/listsHelpers';
import { PanelRow } from '../../styles/Profile.styled';

export const ReservedWishes = () => {
  const theme = useContext(ThemeContext);
  const [reservedWishes, setReservedWishes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchReservedWishes();
      setReservedWishes(response);
      setIsLoading(false);
    })();
  }, []);

  return (
    <StyledPaper elevation={3}>
      {isLoading ? (
        <></>
      ) : reservedWishes.length === 0 ? (
        <p className="center">No wishes reserved yet</p>
      ) : (
        <>
          <p className="paper-title">Your friend's wishes</p>
          {reservedWishes.map((wish, i) => {
            return (
              <PanelRow key={i} theme={theme}>
                <Link to={`/games/${wish.game._id}`}>{shortenStr(wish.game.name, 20)}</Link>
                <p>{wish.owner.username}</p>
                {wish.status === 'Fulfilled' ? (
                  <BadgeCheck size="15" className="completed" />
                ) : (
                  <LoaderCircle size="15" className="pending" />
                )}
              </PanelRow>
            );
          })}
        </>
      )}
    </StyledPaper>
  );
};
