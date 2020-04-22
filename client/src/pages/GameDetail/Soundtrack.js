import React, { useState, useContext, useEffect } from 'react';
import { fetchAlbumID } from '../../services/spotifyService';
import { TokenContext } from '../../contexts/tokenContext';

export const Soundtrack = ({ name }) => {
  const { token } = useContext(TokenContext);
  const [tracks, setTracks] = useState();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      if (token && name) {
        try {
          const response = await fetchAlbumID(name, token);
          console.log('respuesta en el useEffect', response);
          setTracks(response);
        } catch (error) {
          setNotFound(true);
        }
      }
    })();
  }, []);

  if (notFound) return <p>Soundtrack not found</p>;

  return <div>Game's soundtrack</div>;
};
