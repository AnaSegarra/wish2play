const getOptions = (arr, field) => {
  const retrievedOptions = [];
  arr.forEach(game => {
    game[field].forEach(fieldOpt => {
      if (!retrievedOptions.includes(fieldOpt)) {
        retrievedOptions.push(fieldOpt);
      }
    });
  });
  return retrievedOptions;
};

module.exports = getOptions;
