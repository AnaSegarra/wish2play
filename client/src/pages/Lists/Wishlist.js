import React, { useEffect, useState, useContext } from 'react';
import { fetchWishlist, reserveFriendWish } from '../../services/wishesService';
import { AuthContext } from '../../contexts/authContext';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { useParams } from 'react-router-dom';
import { sortByName, isIncluded } from '../../helpers/listsHelpers';
import { ListOwner } from './ListOwner';
import { Tooltip } from '@material-ui/core';
import { SubmitBtn } from '../GameDetail/ReviewForm';

const Wishlist = () => {
  const { id } = useParams();
  const { user, isLoading, setUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetchWishlist(id);
      setWishlist(sortByName(response.wishlist));
      setOwner(response.user);
    })();
  }, []);

  const makeReserved = async wishID => {
    const response = await reserveFriendWish(wishID);
    setUser(response.userUpdated);

    const updatedWishlist = wishlist.filter(wish => wish._id !== response.wishUpdated._id); // remove wish with previous status
    const newList = sortByName([...updatedWishlist, response.wishUpdated]); // include wish updated
    setWishlist(newList);
  };

  if (isLoading) return <></>;

  if (user._id === id) return <ListOwner wishlist={wishlist} setWishlist={setWishlist} />;

  return (
    <div>
      <h2>{`${owner.username}'s wishlist`}</h2>
      {wishlist.length > 0 &&
        wishlist.map((wish, i) => {
          return wish.isPublic ? (
            <div key={i}>
              <p>{wish.game.name}</p>
              <img src={wish.game.image} height="300" />
              <p>{wish.status}</p>

              {wish.status === 'Free' && (
                <Tooltip
                  title={
                    !isIncluded(owner._id, user.friends)
                      ? 'Has to be a friend to reserve their wish'
                      : ''
                  }>
                  <span>
                    <SubmitBtn
                      disabled={!isIncluded(owner._id, user.friends)}
                      onClick={() => makeReserved(wish._id)}
                      style={!isIncluded(owner._id, user.friends) ? { pointerEvents: 'none' } : {}}>
                      Reserve
                    </SubmitBtn>
                  </span>
                </Tooltip>
              )}
              {wish.status === 'Reserved' && isIncluded(wish._id, user.reservedWishes) && (
                <p>Reservao</p>
              )}
            </div>
          ) : (
            ''
          );
        })}
    </div>
  );
};

export const ProtectedWishlist = withProtectedRoute(Wishlist);
