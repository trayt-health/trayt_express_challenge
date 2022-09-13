const { Router } = require('express');

const movieRoutes = require('./routes/movieRoutes');

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/recommendations', movieRoutes);

module.exports = router;
