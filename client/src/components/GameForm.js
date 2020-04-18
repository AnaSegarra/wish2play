import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { fetchFilterOptions, addGame, uploadGameImage } from '../services/gamesService';
import { formatOptions, groupFilters } from '../helpers/filters';
import { SuccessMsg, ErrorMsg } from './AlertMsg';
import { GameFormStyled, ImgPlaceholder } from '../styles/Admin.styled';
import { Button, Input } from '../styles/Form';
import { ThemeContext } from 'styled-components';
import { updateRequestStatus } from '../services/requestsService';

export const GameForm = ({ request, setIsEditing, handleAction = addGame }) => {
  const theme = useContext(ThemeContext);
  const ESRBOptions = formatOptions(['E', 'E 10+', 'T', 'M', 'A', 'RP'], 'ESRB');
  const [genresAvailable, setGenresAvailable] = useState([]);
  const [platformsAvailable, setPlatformsAvailable] = useState([]);
  const [newGame, setNewGame] = useState(
    request
      ? { ...request.content, releaseYear: request.releaseYear || '' }
      : {
          name: '',
          image: '',
          description: '',
          releaseYear: '',
          ESRB: '',
          platforms: [],
          genres: [],
          company: '',
          linkToBuy: ''
        }
  ); // sets request data or empty object otherwise
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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

  const handleMultiSelect = (selected, { name }) => {
    if (name === 'platforms') {
      const platforms = groupFilters(selected, 'platforms');
      setNewGame({ ...newGame, platforms: platforms || [] });
    } else {
      const genres = groupFilters(selected, 'genres');
      setNewGame({ ...newGame, genres: genres || [] });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await handleAction(newGame);
    if (!request) {
      setSuccessMsg(response);

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
      const response = await updateRequestStatus(request._id, 'Approved');
      setIsEditing();
    }
  };

  const handleImgEdit = async e => {
    const imgSelected = e.target.files[0];
    setSelectedFile(URL.createObjectURL(imgSelected)); // creates image preview
    const img = new FormData();
    img.append('image', imgSelected);

    const response = await uploadGameImage(img, 'game');
    console.log(response);

    if (response.image) {
      setNewGame({ ...newGame, image: response.image });
    } else {
      setError(response);
    }
  };

  return (
    <>
      <GameFormStyled onSubmit={handleSubmit} theme={theme}>
        <div className="img-input">
          {request && request.image ? (
            <img src={newGame.image} alt="game img preview" width="auto" height="200" />
          ) : (
            <ImgPlaceholder>
              <p>No image provided</p>
            </ImgPlaceholder>
          )}
          {selectedFile && (
            <img src={selectedFile} alt="game img preview" width="auto" height="200" />
          )}
          <input type="file" name="image" onChange={handleImgEdit} />
        </div>
        <label htmlFor="name">Name</label>
        <Input type="text" name="name" onChange={handleChange} value={newGame.name} />
        <label htmlFor="description">Description</label>
        <textarea name="description" onChange={handleChange} value={newGame.description}></textarea>
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
            request && ESRBOptions.filter(({ value }) => value === request.content.ESRB)
          }
        />
        <label htmlFor="platforms">Playable on</label>
        <CreatableSelect
          isClearable
          isMulti
          options={platformsAvailable}
          name="platforms"
          onChange={handleMultiSelect}
          defaultValue={request && formatOptions(newGame.platforms, 'platforms')}
        />
        <label htmlFor="genres">Genres</label>
        <CreatableSelect
          isClearable
          isMulti
          options={genresAvailable}
          name="genres"
          onChange={handleMultiSelect}
          defaultValue={request && formatOptions(newGame.genres, 'genres')}
        />
        <label htmlFor="company">Developed by</label>
        <Input type="text" name="company" onChange={handleChange} value={newGame.company} />
        <label htmlFor="linkToBuy">Available</label>
        <Input type="text" name="linkToBuy" onChange={handleChange} value={newGame.linkToBuy} />
        <button type="submit">Add game</button>
      </GameFormStyled>
      {successMsg && <SuccessMsg msg={successMsg} handleClose={() => setSuccessMsg('')} />}
      {errorMsg && <ErrorMsg msg={errorMsg} handleClose={() => setErrorMsg('')} />}
    </>
  );
};
