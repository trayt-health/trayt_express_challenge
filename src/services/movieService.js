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
 * Filter out movies from the movies that has already been rated
 *
 * @param {Array} ratedMovies: List of rated movies
 * @param {Array} movies: List of recommended movies
 *
 * @returns: Filtered list of movies that have not been rated
 */
function filterRatedMovies(ratedMovies, movies) {
  const ratedMovieIds = ratedMovies.map((movie) => movie.id);

  return movies.filter((movie) => !ratedMovieIds.includes(movie.id));
}

/**
 * Generate recommendation for a given userId
 *
 * @param {string} userId: UserId of a user
 * @returns: List of movie recommendations
 */
async function generateRecommendation(userId) {
  const ratedMovies = await getRatedMovies(userId);
  const highlyRatedMovies = ratedMovies.filter((movie) => movie.userRating > 7);

  const favDirector = getFavDirector(highlyRatedMovies);
  const favGenre = getFavGenre(highlyRatedMovies);

  const favDirectorMoviesPromise = getRecommendationByDirector(favDirector);
  const favGenreMoviesPromise = getRecommendationByGenre(favGenre);

  const [favDirectorMovies, favGenreMovies] = await Promise.all([
    favDirectorMoviesPromise,
    favGenreMoviesPromise,
  ]);

  const recommendations = [...favDirectorMovies, ...favGenreMovies];

  return filterRatedMovies(ratedMovies, recommendations);
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
