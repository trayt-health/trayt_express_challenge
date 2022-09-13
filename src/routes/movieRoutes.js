const { Router } = require('express');

const auth = require('../auth');
const movieController = require('../controllers/movies');

const router = Router();

/**
 * GET /recommendations
 */
router.get('/', auth.validateUser, movieController.getRecommendations);

module.exports = router;
