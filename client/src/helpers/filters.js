// changes array into an array of objects
export const formatOptions = (arr, group) => {
  return arr.map(el => {
    return { value: el, label: el, group };
  });
};

// groups filters according to a chosen parameter (ESRB, genre...)
export const groupFilters = (arr, filterBy) => {
  return arr ? arr.filter(item => item.group === filterBy).map(item => item.value) : '';
};
