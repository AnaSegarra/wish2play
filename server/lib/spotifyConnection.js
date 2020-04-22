const axios = require('axios');

const getToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
  params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

  const { data } = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const auth_token = `${data.token_type} ${data.access_token}`;
  return auth_token;
};

const searchAlbum = async (query, token) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/search?type=album&limit=1&q=${query}`,
    {
      headers: { Authorization: token }
    }
  );
  return data;
};

const getAlbum = async (albumID, token) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
    headers: { Authorization: token }
  });
  return data;
};

module.exports = { getToken, searchAlbum, getAlbum };
