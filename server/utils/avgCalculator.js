const calcAverage = arr => {
  console.log('el array de reviews', arr);
  const average = arr.reduce((acc, cur) => acc + cur.rating, 0) / arr.length;
  const roundAvg = Math.round(average * 2) / 2;
  console.log('la media', roundAvg);
  return roundAvg;
};

module.exports = calcAverage;
