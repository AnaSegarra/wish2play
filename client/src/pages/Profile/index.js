import React, { useContext, useEffect, useState } from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { AuthContext } from '../../contexts/authContext';
import { fetchGamesPlayedList } from '../../services/usersService';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [gamesPlayed, setGamesPlayed] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('getting games');

      const games = await fetchGamesPlayedList(user._id);

      setGamesPlayed(games);
    })();
  }, []);

  return (
    <div>
      <p>El perfil del usuario</p>
      <p>Los juegos jugados</p>
      {gamesPlayed.length > 0 &&
        gamesPlayed.map(game => {
          return <p>{game.name}</p>;
        })}
    </div>
  );
};

export const ProtectedProfile = withProtectedRoute(Profile);
