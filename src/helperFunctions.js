// Don't modify this file

const { cloneDeep } = require('lodash')
const { users, ratedMovies, movies } = require('./fakeDB.json')

const ONE_DAY = 10 * 1000 // realistically it will be something like 1 day

const moviesByDirector = {}
const moviesByGenre = {}

Object.values(movies).forEach((movie) => {
  const { id, director, genres } = movie
  if (moviesByDirector[director]) {
    moviesByDirector[director].push(id)
  } else {
    moviesByDirector[director] = [id]
  }

  genres.forEach((genre) => {
    if (moviesByGenre[genre]) {
      moviesByGenre[genre].push(id)
    } else {
      moviesByGenre[genre] = [id]
    }
  })
})

const userRecommendations = {}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * @typedef Movie
 * @property {string} id The id of the movie
 * @property {string} name The name of the movie
 * @property {string} director The director of the movie
 * @property {string} genres An Array<string> of genres
 */

/**
 * @typedef Recommendation
 * @property {string} favDirector User's favorite director
 * @property {string} favGenre User's favorite genre
 * @property {<Array<Movie>} byDirector An array of movies directed by the same director
 * @property {<Array<Movie>} byGenre An array of movies that are in the same genre
 */

/**
 * Get user's movie rating
 * 
 * @param  {string} userId user's id
 * @return {Promise<Array<Movie>>} A promise to the token.
 */
async function getRatedMovies(userId) {
  const user = users[userId]
  if (!user) throw new Error('User does not exist')
  await delay(100)
  return cloneDeep(ratedMovies[userId].map(({ id, userRating }) => ({ ...movies[id], userRating })))
}

/**
 * Get Recommendation by director
 * 
 * @param  {string} director director's name
 * @return {Promise<Array<Movie>>} An array of recommended movies
 */
async function getRecommendationByDirector(director) {
  await delay(100)
  return cloneDeep(moviesByDirector[director].map((id) => movies[id]))
}

/**
 * Get Recommendation by genre
 * 
 * @param  {string} genre
 * @return {Promise<Array<Movie>>} An array of recommended movies
 */
async function getRecommendationByGenre(genre) {
  await delay(100)
  return cloneDeep(moviesByGenre[genre].map((id) => movies[id]))
}

/**
 * Save Recommendation to database
 * Note: This data will be wiped in 10 seconds (realistically it will be something like a day)
 * 
 * @param  {string} userId User's id 
 * @param  {Recommendation} recommendation Recommendation object that needs to be saved
 * @return {Promise} returns nothing
 */
async function saveRecommendations(userId, recommendation) {
  const user = users[userId]
  const createdDate = Date.now()
  if (!user) throw new Error('User does not exist')
  await delay(100)
  userRecommendations[userId] = cloneDeep({ recommendation, createdDate })
  return
}

/**
 * Get Recommendation from database
 * 
 * @param  {string} userId
 * @return {Promise<Recommendation>} recommendations Recommendation object that was saved to the database. It retuns null if there are no saved recommendations or it has expired
 */
async function getSavedRecommendations(userId) {
  await delay(100)
  const now = Date.now()
  const { recommendation, createdDate } = userRecommendations[userId] || {}
  if ((now - createdDate) > ONE_DAY) {
    return null
  } else {
    return cloneDeep(recommendation)
  }
}

module.exports = {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
}
