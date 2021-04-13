const getRandBetweenNegPos = () => {
  const maxAngleDegOffset = 100;
  // source: https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
  return (
    Math.ceil(Math.random() * (maxAngleDegOffset + 1)) *
    (Math.round(Math.random()) ? 1 : -1)
  );
};

export { getRandBetweenNegPos };
