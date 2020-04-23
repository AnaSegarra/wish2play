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
    const albumID = album.id;
    const images = album.images;
    const response = await axios.get(`${process.env.API_URL}/spotify/soundtrack`, {
      params: { albumID, token }
    });
    return { tracks: response.data.items, cover: images };
  } catch (error) {
    throw new Error('Soundtrack not found');
  }
};
