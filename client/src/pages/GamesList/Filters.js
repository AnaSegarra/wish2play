import React from 'react';
import { Input } from '../../StyledComponents/Form';
import Select from 'react-select';

export const Filters = ({ search, options, handleSelect }) => {
  return (
    <div>
      <Input onChange={e => search(e.target.value)} placeholder="Search for games" />
      <Select options={options} isMulti onChange={handleSelect} />
    </div>
  );
};
