const { Router } = require('express');

const movieController = require('../controllers/movies');

const router = Router();

/**
 * GET /recommendations
 */
router.get('/', movieController.getRecommendations);

module.exports = router;
