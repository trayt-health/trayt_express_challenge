function getMovieRecommendation(userId) {
  return new Promise((resolve, reject) => {
    resolve(['Inception']);
  });
}

module.exports = {
  getMovieRecommendation,
};
