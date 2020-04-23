const calcAverage = arr => {
  console.log('reviews array', arr);
  if (arr.length === 0) return 0;
  const average = arr.reduce((acc, cur) => acc + cur.rating, 0) / arr.length;
  console.log('average', average);
  const roundAvg = Math.round(average * 2) / 2;
  console.log('average rounded', roundAvg);
  return roundAvg;
};

module.exports = calcAverage;
