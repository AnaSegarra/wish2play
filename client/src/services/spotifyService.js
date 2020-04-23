import axios from 'axios';

export const getToken = async () => {
  try {
    const { data } = await axios.post(`${process.env.API_URL}/spotify/token`);
    return data.token;
  } catch (error) {
    throw new Error('Unable to get soundtracks');
  }
};

export const fetchAlbumID = async (game, token) => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/spotify`, { params: { game, token } });
    const album = data.albums.items[0];
    // search for soundtrack only if found item is of type album
    if (album.album_type === 'album') {
      console.log('es del tipo album');
      const albumID = album.id;
      const images = album.images;
      const response = await axios.get(`${process.env.API_URL}/spotify/soundtrack`, {
        params: { albumID, token }
      });
      return { tracks: response.data.items, cover: images };
    }
    console.log('no es del tipo album');
  } catch (error) {
    throw new Error('Soundtrack not found');
  }
};
