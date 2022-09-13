const movieServices = require('../services/movieService');

function getRecommendations(req, res, next) {
  movieServices
    .getMovieRecommendation(req.userId)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  getRecommendations,
};
