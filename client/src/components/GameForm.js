// dependencies
import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ThemeContext } from 'styled-components';

// local modules
import { fetchFilterOptions, addGame, uploadGameImage } from '../services/gamesService';
import { updateRequestStatus } from '../services/requestsService';
import { formatOptions } from '../helpers/filters';
import { SuccessMsg, ErrorMsg } from './AlertMsg';

// styled componentes
import { GameFormStyled, ImgPlaceholder } from '../styles/Admin.styled';
import { Input, Button } from '../styles/Form';
import { Textarea } from '../styles/GameDetail.styled';

export const GameForm = ({
  request,
  user,
  gameToEdit,
  setUpdatedGame,
  requestID,
  allRequests,
  updateRequest,
  isEditing,
  handleAction = addGame
}) => {
  const theme = useContext(ThemeContext);
  const ESRBOptions = formatOptions(['E', 'E 10+', 'T', 'M', 'A', 'RP'], 'ESRB');
  const [genresAvailable, setGenresAvailable] = useState([]);
  const [platformsAvailable, setPlatformsAvailable] = useState([]);
  const [newGame, setNewGame] = useState(
    gameToEdit
      ? { ...gameToEdit, releaseYear: gameToEdit.releaseYear || '' }
      : {
          name: '',
          image: '',
          description: '',
          releaseYear: '',
          ESRB: 'RP',
          platforms: [],
          genres: [],
          company: '',
          linkToBuy: ''
        }
  ); // sets request/edit data or empty object otherwise
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState({ isError: false, errorMsg: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  // fill select with options already in db
  useEffect(() => {
    (async () => {
      const { genres, platforms } = await fetchFilterOptions();
      const genresOptions = formatOptions(genres, 'genres');
      const platformsOptions = formatOptions(platforms, 'platforms');

      setGenresAvailable(genresOptions);
      setPlatformsAvailable(platformsOptions);
    })();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handlePlatforms = selected => {
    const platforms = selected && selected.map(i => i.value);
    setNewGame({ ...newGame, platforms: platforms || [] });
  };

  const handleGenres = selected => {
    const genres = selected && selected.map(i => i.value);
    setNewGame({ ...newGame, genres: genres || [] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isEditing && !request) {
      const response = await handleAction(newGame, gameToEdit._id);
      setUpdatedGame(response);
    } else {
      const response = await handleAction(newGame);
      if (response.message) {
        setSuccessMsg(response.message);
      } else {
        console.log(response);
        setError({ isError: true, errorMsg: response });
      }

      // clear inputs
      setNewGame({
        name: '',
        image: '',
        description: '',
        releaseYear: '',
        ESRB: '',
        platforms: [],
        genres: [],
        company: '',
        linkToBuy: ''
      });
      setSelectedFile(null);
    }

    if (request) {
      console.log('es una petición');
      const response = await updateRequestStatus(requestID, 'Approved');
      const updatedRequests = allRequests.filter(request => request._id !== requestID);
      updateRequest([...updatedRequests, response]);
    }
  };

  const handleImgEdit = async e => {
    const imgSelected = e.target.files[0];
    setSelectedFile(URL.createObjectURL(imgSelected)); // creates image preview
    const img = new FormData();
    img.append('image', imgSelected);

    const response = await uploadGameImage(img, 'game');

    if (response.image) {
      setNewGame({ ...newGame, image: response.image });
    } else {
      setErrorMsg(response);
    }
  };

  return (
    <>
      <GameFormStyled onSubmit={handleSubmit} theme={theme} id={gameToEdit && 'edit-form'}>
        <div className="img-input">
          {gameToEdit && newGame.image ? (
            <img src={newGame.image} alt="game img preview" width="auto" height="200" />
          ) : selectedFile ? (
            <img src={selectedFile} alt="game img preview" width="auto" height="200" />
          ) : (
            <ImgPlaceholder>
              <p>No image provided</p>
            </ImgPlaceholder>
          )}

          <input type="file" name="image" onChange={handleImgEdit} />
        </div>
        <label htmlFor="name">Name</label>
        <Input type="text" name="name" onChange={handleChange} value={newGame.name} />
        <label htmlFor="description">Description</label>
        <Textarea
          name="description"
          onChange={handleChange}
          value={newGame.description}
          rows="7"
          style={{ width: '100%', resize: 'none' }}
        />
        <label htmlFor="releaseYear">Released on</label>
        <Input
          type="number"
          name="releaseYear"
          onChange={handleChange}
          value={newGame.releaseYear}
        />
        <label htmlFor="ESRB">ESRB rating</label>
        <Select
          isClearable
          options={ESRBOptions}
          name="ESRB"
          onChange={selected =>
            selected
              ? setNewGame({ ...newGame, ESRB: selected.value })
              : setNewGame({ ...newGame, ESRB: '' })
          }
          className="react-select__control"
          defaultValue={
            (gameToEdit && ESRBOptions.filter(({ value }) => value === gameToEdit.ESRB)) ||
            newGame.ESRB
          }
        />
        <label htmlFor="platforms">Playable on</label>
        <CreatableSelect
          isClearable
          isMulti
          options={platformsAvailable}
          name="platforms"
          onChange={handlePlatforms}
          defaultValue={gameToEdit && formatOptions(newGame.platforms, 'platforms')}
        />
        <label htmlFor="genres">Genres</label>
        <CreatableSelect
          isClearable
          isMulti
          options={genresAvailable}
          name="genres"
          onChange={handleGenres}
          defaultValue={gameToEdit && formatOptions(newGame.genres, 'genres')}
        />
        <label htmlFor="company">Developed by</label>
        <Input type="text" name="company" onChange={handleChange} value={newGame.company} />
        <label htmlFor="linkToBuy">Available</label>
        <Input type="text" name="linkToBuy" onChange={handleChange} value={newGame.linkToBuy} />
        <div className="btn-container">
          {!gameToEdit && !user && <Button type="submit">Add game</Button>}{' '}
        </div>
        <div className="btn-container">
          {' '}
          {user && <Button type="submit">Submit request</Button>}
        </div>
      </GameFormStyled>
      {successMsg && <SuccessMsg msg={successMsg} handleClose={() => setSuccessMsg('')} />}
      {error.isError && (
        <ErrorMsg
          errorMsg={error.errorMsg}
          isError={error.isError}
          handleClose={() => setError('')}
          position={{ vertical: 'bottom', horizontal: 'center' }}
        />
      )}
    </>
  );
};
