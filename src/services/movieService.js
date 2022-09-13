const objectUtil = require('../utils/objectUtil');

const {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
} = require('../helperFunctions');

// #region Internal functions

/**
 * Filter the fav director based on user's rated movies
 *
 * @param {Array} ratedMovies: LIst of moves
 * @returns: Fav Director
 */
function getFavDirector(ratedMovies) {
  return objectUtil.getMode(ratedMovies, 'director');
}

/**
 * Filter the fav genre based on user's rated movies
 *
 * @param {Array} ratedMovies: LIst of moves
 * @returns: Fav Genre
 */
function getFavGenre(ratedMovies) {
  return objectUtil.getMode(ratedMovies, 'genres');
}

/**
 * Generate recommendation for a given userId
 *
 * @param {string} userId: UserId of a user
 * @returns: List of movie recommendations
 */
async function generateRecommendation(userId) {
  const ratedMovies = await getRatedMovies(userId);

  const favDirector = getFavDirector(ratedMovies);
  const favGenre = getFavGenre(ratedMovies);

  const favDirectorMoviesPromise = getRecommendationByDirector(favDirector);
  const favGenreMoviesPromise = getRecommendationByGenre(favGenre);

  const [favDirectorMovies, favGenreMovies] = await Promise.all([
    favDirectorMoviesPromise,
    favGenreMoviesPromise,
  ]);

  const recommendations = [...favDirectorMovies, ...favGenreMovies];
  // Filter out movies in byDirector and byGenre that's already in the user's ratedMovies. (Because that means the user already watched it)

  return recommendations;
}

// #endregion

// #region exposed Service funtions
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

  const recommendations = await generateRecommendation(userId);

  saveRecommendations(userId, recommendations);

  return recommendations;
}

// #endregion

module.exports = {
  getMovieRecommendation,
};
