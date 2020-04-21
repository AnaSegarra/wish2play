// dependencies
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { Chip, Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ShoppingCart } from 'styled-icons/typicons';
import { TrashAlt, EditAlt } from '@styled-icons/boxicons-solid';
import { ArrowGoBack } from 'styled-icons/remix-line';

// local modules
import { AuthContext } from '../../contexts/authContext';
import { deleteGameDB, updateGame } from '../../services/gamesService';
import { GameForm } from '../../components/GameForm';
import { useStyles } from '../../components/GameCard';
import { UserButtons } from './UserInteraction';

// styled components
import { Container, ImageContainer, Content } from '../../styles/GameDetail.styled';
import { ButtonsContainer } from '../../styles/GameDetail.styled';
import { StyledPaper } from '../../styles/Home.styled';

export const GameContent = props => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showEditForm = () => setEditForm(true);
  const closeEditForm = () => setEditForm(false);

  const {
    image,
    name,
    company,
    releaseYear,
    platforms,
    ESRB,
    totalRating,
    linkToBuy,
    description,
    genres,
    _id,
    setUpdatedGame
  } = props;

  // remove game from db
  const removeGameDB = async () => {
    await deleteGameDB(_id);
    history.push('/games');
  };

  return (
    <StyledPaper elevation={3}>
      <ButtonsContainer theme={theme}>
        <Link to="/games">
          <ArrowGoBack size="25" />
        </Link>
        {user && user.isAdmin && (
          <div>
            <button>
              <EditAlt size="25" onClick={showEditForm} />
              <GameEditForm
                open={editForm}
                closeEditForm={closeEditForm}
                game={props}
                setUpdatedGame={setUpdatedGame}
              />
            </button>
            <button>
              <TrashAlt size="25" onClick={handleOpen} />
              <ConfirmationDelete
                open={open}
                handleClose={handleClose}
                handleDelete={removeGameDB}
              />
            </button>
          </div>
        )}
        {user && !user.isAdmin && <UserButtons gameID={_id} setUpdatedGame={setUpdatedGame} />}
      </ButtonsContainer>
      <Container>
        <ImageContainer>
          <img src={image} />
        </ImageContainer>

        <Content theme={theme}>
          <div>
            <p className="title">{name}</p>
            <p className="subtitle">by {company}</p>
          </div>
          <p className="description">{description}</p>
          <div className="stats">
            <div className="data">
              <p>
                Released <span>{releaseYear}</span>
              </p>
              <p>
                Playable on: <span>{platforms.join(', ')}</span>
              </p>
              <p>
                Rated: <span>{ESRB}</span>
              </p>
            </div>
            <div>
              <Rating name="half-rating-read" value={totalRating} readOnly precision={0.5} />
            </div>
          </div>
          <div className="bottom">
            <div className="chips">
              {genres.map((genre, i) => (
                <Chip key={i} label={genre} className={classes.chip} />
              ))}
            </div>
            <Chip
              label={'Shop now'}
              component="a"
              target="blank"
              href={linkToBuy}
              clickable
              icon={<ShoppingCart size="15" />}
              className={classes.chip}
            />
          </div>
        </Content>
      </Container>
    </StyledPaper>
  );
};

export const ConfirmationDelete = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <p>This action will have irreversible consequences. Do you confirm?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const GameEditForm = ({ open, closeEditForm, game, setUpdatedGame }) => {
  return (
    <Dialog open={open} onClose={closeEditForm} aria-labelledby="form-dialog-title">
      <DialogContent>
        <p>Game edit</p>
        <GameForm gameToEdit={game} handleAction={updateGame} setUpdatedGame={setUpdatedGame} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditForm} color="primary">
          Cancel
        </Button>
        <Button color="primary" type="submit" form="edit-form" onClick={closeEditForm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
