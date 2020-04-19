// dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Gamepad } from 'styled-icons/remix-fill';
import { Gamepad as GamepadOutlined } from 'styled-icons/remix-line';
import { ThemeContext } from 'styled-components';
import { Heart, HeartOutlined } from 'styled-icons/entypo';
import { TrashAlt, EditAlt } from '@styled-icons/boxicons-solid';
import { Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { addGamePlayed, removeGamePlayed } from '../../services/usersService';
import { addGameWished, removeGameWished, fetchWishlist } from '../../services/wishesService';
import { deleteGameDB } from '../../services/gamesService';
import { isIncluded, arrMapped } from '../../helpers/listsHelpers';

export const UserButtons = ({ gameID, showEditForm }) => {
  const { user, setUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [gamesWished, setGamesWished] = useState([]);
  const [open, setOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      if (user) {
        const response = user && (await fetchWishlist(user._id));
        setWishlist(response.wishlist);
        const arrGames = arrMapped(response.wishlist);
        setGamesWished(arrGames);
      }
    })();
  }, [user]);

  // delete game from user's list
  const removeGame = async gameID => {
    const updatedUser = await removeGamePlayed(gameID);
    setUser(updatedUser);
  };

  // add game to user's list
  const addGame = async gameID => {
    const updatedUser = await addGamePlayed(gameID);
    setUser(updatedUser);
  };

  // add game to wishlist
  const addNewWish = async gameID => {
    const updatedUser = await addGameWished(gameID);
    setUser(updatedUser);
  };

  // remove game from wishlist
  const removeWish = async gameID => {
    const wish = wishlist.find(wish => wish.game._id === gameID);
    const updatedUser = await removeGameWished(wish._id);
    setUser(updatedUser);
  };

  // remove game from db
  const removeGameDB = async () => {
    await deleteGameDB(gameID);
    history.push('/games');
  };

  // if (user && user.isAdmin)
  //   return (
  //     <div>
  //       <button>
  //         <EditAlt size="25" onClick={showEditForm} />
  //       </button>
  //       <button>
  //         <TrashAlt size="25" onClick={handleOpen} />
  //         <ConfirmationDelete open={open} handleClose={handleClose} handleDelete={removeGameDB} />
  //       </button>
  //     </div>
  //   );

  return wishlist ? (
    <div theme={theme}>
      {isIncluded(gameID, user.gamesPlayed) ? (
        <button onClick={() => removeGame(gameID)}>
          Played it!
          <Gamepad size="25" />
        </button>
      ) : (
        <button onClick={() => addGame(gameID)}>
          Not played yet <GamepadOutlined size="25" />
        </button>
      )}
      {isIncluded(gameID, gamesWished) ? (
        <button>
          <Heart size="25" onClick={() => removeWish(gameID)} />
        </button>
      ) : (
        <button onClick={() => addNewWish(gameID)}>
          <HeartOutlined size="25" />
        </button>
      )}
    </div>
  ) : (
    <></>
  );
};

// const ConfirmationDelete = ({ open, handleClose, handleDelete }) => {
//   return (
//     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//       <DialogContent>
//         <p>This action will have irreversible consequences. Do you confirm?</p>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleDelete} color="primary">
//           Yes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
