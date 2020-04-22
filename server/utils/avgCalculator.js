const calcAverage = arr => {
  console.log('el array de reviews', arr);
  if (arr.length === 0) return 0;
  const average = arr.reduce((acc, cur) => acc + cur.rating, 0) / arr.length;
  console.log('la media', average);
  const roundAvg = Math.round(average * 2) / 2;
  console.log('la media rounded', roundAvg);
  return roundAvg;
};

module.exports = calcAverage;
