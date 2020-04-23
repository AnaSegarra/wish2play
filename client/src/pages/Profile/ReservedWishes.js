// dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { LoaderCircle } from 'styled-icons/boxicons-regular';
import { BadgeCheck } from 'styled-icons/boxicons-solid';

// local modules
import { fetchReservedWishes } from '../../services/wishesService';
import { shortenStr } from '../../helpers/listsHelpers';

// styled componentes
import { StyledPaper } from '../../styles/Home.styled';
import { PanelRow } from '../../styles/Profile.styled';
import { usePaperStyles } from '../../styles/Global';

export const ReservedWishes = () => {
  const classes = usePaperStyles();
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
    <StyledPaper elevation={3} className={classes.root}>
      {isLoading ? (
        <></>
      ) : reservedWishes.length === 0 ? (
        <p className="center">No wishes reserved yet</p>
      ) : (
        <>
          <p className="paper-title">Your friend's wishes</p>
          {reservedWishes.map((wish, i) => {
            return (
              <PanelRow key={i}>
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
