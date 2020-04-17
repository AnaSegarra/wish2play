// dependencies
import React from 'react';
import Select from 'react-select';

// styled components
import { Input } from '../../styles/Form';

export const Filters = ({ search, options, handleSelect }) => {
  return (
    <div>
      <Input onChange={e => search(e.target.value)} placeholder="Search for games" />
      <Select options={options} isMulti onChange={handleSelect} />
    </div>
  );
};
