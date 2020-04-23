const express = require('express');
const router = express.Router();
const { getToken, searchAlbum, getAlbum } = require('../lib/spotifyConnection');

router.post('/token', async (req, res, next) => {
  try {
    const auth_token = await getToken();
    return res.json({ token: auth_token });
  } catch (error) {
    console.log('Error retrieving spotify token', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { game, token } = req.query;
    const response = await searchAlbum(game, token);
    return res.json(response);
  } catch (error) {
    console.log('Error searching for an album', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/soundtrack', async (req, res, next) => {
  try {
    const { albumID, token } = req.query;
    const response = await getAlbum(albumID, token);
    return res.json(response);
  } catch (error) {
    console.log('Error searching for tracks', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
