// dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Gamepad } from 'styled-icons/remix-fill';
import { Gamepad as GamepadOutlined } from 'styled-icons/remix-line';
import { ThemeContext } from 'styled-components';
import { Heart, HeartOutlined } from 'styled-icons/entypo';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { addGamePlayed, removeGamePlayed } from '../../services/usersService';
import { addGameWished, removeGameWished, fetchWishlist } from '../../services/wishesService';
import { isIncluded, arrMapped } from '../../helpers/listsHelpers';

// styled components
import { ButtonsContainer } from '../../styledComponents/GameDetail.styled';

export const UserButtons = ({ gameID }) => {
  const { user, setUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [gamesWished, setGamesWished] = useState([]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      if (user) {
        const response = user && (await fetchWishlist(user._id));
        setWishlist(response.wishlist);
        const arrGames = arrMapped(response.wishlist);
        setGamesWished(arrGames);
      }
    })();
  }, [user]);

  // delete game from user's list
  const removeGame = async gameID => {
    const updatedUser = await removeGamePlayed(gameID);
    setUser(updatedUser);
  };

  // add game to user's list
  const addGame = async gameID => {
    const updatedUser = await addGamePlayed(gameID);
    setUser(updatedUser);
  };

  // add game to wishlist
  const addNewWish = async gameID => {
    const updatedUser = await addGameWished(gameID);
    setUser(updatedUser);
  };

  // remove game from wishlist
  const removeWish = async gameID => {
    const wish = wishlist.find(wish => wish.game._id === gameID);
    const updatedUser = await removeGameWished(wish._id);
    setUser(updatedUser);
  };

  return user && wishlist ? (
    <ButtonsContainer theme={theme}>
      {isIncluded(gameID, user.gamesPlayed) ? (
        <button onClick={() => removeGame(gameID)}>
          Played it!
          <Gamepad size="25" />
        </button>
      ) : (
        <button onClick={() => addGame(gameID)}>
          Not played yet <GamepadOutlined size="25" />
        </button>
      )}
      {isIncluded(gameID, gamesWished) ? (
        <button>
          <Heart size="25" onClick={() => removeWish(gameID)} />
        </button>
      ) : (
        <button onClick={() => addNewWish(gameID)}>
          <HeartOutlined size="25" />
        </button>
      )}
    </ButtonsContainer>
  ) : (
    <></>
  );
};
