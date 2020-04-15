import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { fetchFilterOptions, addGame } from '../../services/gamesService';
import { formatOptions, groupFilters } from '../../helpers/filters';
import { SuccessMsg, ErrorMsg } from '../../components/AlertMsg';

export const GameForm = () => {
  const ESRBOptions = formatOptions(['E', 'E 10+', 'T', 'M', 'A', 'RP'], 'ESRB');

  const [genresAvailable, setGenresAvailable] = useState([]);
  const [platformsAvailable, setPlatformsAvailable] = useState([]);
  const [newGame, setNewGame] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
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

  const handleImgUpload = e => {
    const imgSelected = e.target.files[0];
    setSelectedFile(imgSelected);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const img = new FormData();
    img.append('image', selectedFile);

    const response = await addGame(newGame, img);
    console.log('respuesta', response);
    setSuccessMsg(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <textarea name="description" onChange={handleChange}></textarea>
        <label htmlFor="releaseYear">Released on</label>
        <input type="number" name="releaseYear" onChange={handleChange} />
        <label htmlFor="ESRB">ESRB rating</label>
        <label htmlFor="image"></label>
        <input type="file" name="image" onChange={handleImgUpload} />
        <Select
          isClearable
          options={ESRBOptions}
          name="ESRB"
          onChange={({ value }) => setNewGame({ ...newGame, ESRB: value })}
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
        <input type="text" name="company" onChange={handleChange} />
        <label htmlFor="linkToBuy">Available</label>
        <input type="text" name="linkToBuy" onChange={handleChange} />
        <button type="submit">Add game</button>
      </form>
      {successMsg && <SuccessMsg msg={successMsg} handleClose={() => setSuccessMsg('')} />}
    </>
  );
};
