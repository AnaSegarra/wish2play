export const formatOptions = (arr, group) => {
  return arr.map(el => {
    return { value: el, label: el, group };
  });
};

export const groupFilters = (arr, filterBy) => {
  console.log('el array a filtrar', arr);

  return arr ? arr.filter(item => item.group === filterBy).map(item => item.value) : '';
};
