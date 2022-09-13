const {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
} = require('../helperFunctions');

function getFavDirector(ratedMovies) {
  return 'Niki Caro';
}

function getFavGenre(ratedMovies) {
  return 'Action';
}

/**
 * Get a list of movies recommended for a user.
 *
 * @param {string} userId: userId
 * @returns: List of movies
 */
async function getMovieRecommendation(userId) {
  const savedRecommendations = await getSavedRecommendations(userId);

  if (savedRecommendations && savedRecommendations.length > 0) {
    return savedRecommendations;
  }

  const ratedMovies = await getRatedMovies(userId);

  const favDirector = getFavDirector(ratedMovies);
  const favGenre = getFavGenre(ratedMovies);

  const favDirectorMoviesPromise = getRecommendationByDirector(favDirector);
  const favGenreMoviesPromise = getRecommendationByGenre(favGenre);

  const [favDirectorMovies, favGenreMovies] = await Promise.all([
    favDirectorMoviesPromise,
    favGenreMoviesPromise,
  ]);

  const recommendations = favDirectorMovies.concat(favGenreMovies);
  // Filter out movies in byDirector and byGenre that's already in the user's ratedMovies. (Because that means the user already watched it)

  saveRecommendations(userId, recommendations);

  return recommendations;
}

module.exports = {
  getMovieRecommendation,
};
