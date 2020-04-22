import axios from 'axios';

const wishesService = axios.create({
  baseURL: `${process.env.API_URL}/wishes`,
  withCredentials: true
});

export const fetchWishlist = async user_id => {
  try {
    const { data } = await wishesService.get(`${user_id}/wishlist`);
    return data;
  } catch (error) {
    throw new Error('No user logged');
  }
};

export const addGameWished = async game_id => {
  const { data } = await wishesService.post('/wishlist', { game_id });
  return data.userUpdated;
};

export const removeGameWished = async id => {
  const { data } = await wishesService.delete(`/wishlist/${id}`);
  return data.userUpdated;
};

export const updateWish = async (id, update) => {
  const { data } = await wishesService.put(`/wishlist/${id}`, update);
  return data.wishUpdated;
};

export const reserveFriendWish = async wish => {
  const { data } = await wishesService.post('/reserved-wishes', { wish });
  return data;
};

export const fetchReservedWishes = async () => {
  const { data } = await wishesService.get('/reserved-wishes');
  return data.results;
};

export const deleteFriendWish = async id => {
  const { data } = await wishesService.delete(`/reserved-wishes/${id}`);
  return { user: data.userUpdated, wish: data.wishUpdated };
};
