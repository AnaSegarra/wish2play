import axios from 'axios';

const wishesService = axios.create({
  baseURL: 'http://localhost:3000/api/v1/wishes',
  withCredentials: true
});

export const fetchWishlist = async user_id => {
  const { data } = await wishesService.get(`${user_id}/wishlist`);
  return data.wishlist;
};

export const addGameWished = async game_id => {
  const { data } = await wishesService.post('/wishlist', { game_id });
  return data.userUpdated;
};

export const removeGameWished = async id => {
  const { data } = await wishesService.delete(`/wishlist/${id}`);
  return data.userUpdated;
};
