const cors = require('cors');
const express = require('express');

const routes = require('./routes');
const config = require('./config');

const {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
} = require('./helperFunctions');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/', routes);

app.listen(config.LISTENING_PORT, () => {
  console.log(`Server is listening on ${config.LISTENING_PORT}`);
});
