import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { fetchFilterOptions, addGame, uploadGameImage } from '../services/gamesService';
import { formatOptions, groupFilters } from '../helpers/filters';
import { SuccessMsg, ErrorMsg } from './AlertMsg';
import { GameFormStyled } from '../styledComponents/Admin.styled';
import { Grid, Paper } from '@material-ui/core';
import { Button, Input } from '../styledComponents/Form';
import { ThemeContext } from 'styled-components';
import { StyledPaper } from '../styledComponents/Home.styled';

export const GameForm = ({ handleAction = addGame }) => {
  const theme = useContext(ThemeContext);
  const ESRBOptions = formatOptions(['E', 'E 10+', 'T', 'M', 'A', 'RP'], 'ESRB');
  const [genresAvailable, setGenresAvailable] = useState([]);
  const [platformsAvailable, setPlatformsAvailable] = useState([]);
  const [newGame, setNewGame] = useState();
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
    setSuccessMsg(response);
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
      <Paper>
        <GameFormStyled onSubmit={handleSubmit} theme={theme}>
          <label htmlFor="name">Name</label>
          <Input type="text" name="name" onChange={handleChange} />
          <label htmlFor="image">Game's image</label>
          {selectedFile && (
            <img src={selectedFile} alt="game img preview" width="auto" height="300" />
          )}
          <input type="file" name="image" onChange={handleImgEdit} />
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={handleChange}></textarea>
          <label htmlFor="releaseYear">Released on</label>
          <Input type="number" name="releaseYear" onChange={handleChange} />
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
          />
          <label htmlFor="platforms">Playable on</label>
          <CreatableSelect
            isClearable
            isMulti
            options={platformsAvailable}
            name="platforms"
            onChange={handleMultiSelect}
          />
          <label htmlFor="genres">Genres</label>
          <CreatableSelect
            isClearable
            isMulti
            options={genresAvailable}
            name="genres"
            onChange={handleMultiSelect}
          />
          <label htmlFor="company">Developed by</label>
          <Input type="text" name="company" onChange={handleChange} />
          <label htmlFor="linkToBuy">Available</label>
          <input type="text" name="linkToBuy" onChange={handleChange} />
          <button type="submit">Add game</button>
        </GameFormStyled>
      </Paper>
      {successMsg && <SuccessMsg msg={successMsg} handleClose={() => setSuccessMsg('')} />}
      {errorMsg && <ErrorMsg msg={errorMsg} handleClose={() => setErrorMsg('')} />}
    </>
  );
};
