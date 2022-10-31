const express = require('express')
const cors = require('cors')
const {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
} = require('./helperFunctions')

const LISTENING_PORT = 9000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/recommendations', async (req, res) => {
  // check for barer token
  const { bearer: userId } = req.headers
  // check if saved
  let recommendation = await getSavedRecommendations(userId)
  if (recommendation) return res.json(recommendation)

  let ratedMovies = await getRatedMovies(userId)
  //order by user Rating <=7
  const topRated = ratedMovies.filter(({ userRating }) => userRating >= 7)
  // find fav director
  const favDirector = topRated.at(-1)?.director
  // find most frequented top rated genre
  const genreCounter = topRated.reduceRight((last, current) => {
    current.genres.map((genre) => {
      if (last?.[genre]) {
        last[genre] += 1
      } else {
        last[genre] = 1
      }
    })
    return last
  }, {})

  const favGenre = Object.keys(genreCounter).reduce((a, b) =>
    genreCounter[a] > genreCounter[b] ? a : b
  )
  const byDirector = await getRecommendationByDirector(favDirector)
  const byGenre = await getRecommendationByGenre(favGenre)
  recommendation = {
    favDirector,
    favGenre,
    byDirector,
    byGenre,
  }
  saveRecommendations(userId, recommendation)
  res.json(recommendation)
})

const server = app.listen(LISTENING_PORT, function () {
  console.log(`Server is listening on ${LISTENING_PORT}`)
})
