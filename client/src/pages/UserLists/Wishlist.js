import React, { useEffect } from 'react';
import { fetchWishlist } from '../../services/wishesService';

export const Wishlist = props => {
  const { id } = props.match.params;
  useEffect(() => {
    async () => {
      const response = fetchWishlist(id);
      console.log(response);
    };
  }, []);

  return <div>Lista de deseos</div>;
};
