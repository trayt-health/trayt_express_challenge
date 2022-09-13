const { Router } = require('express');

const router = Router();

/**
 * GET /recommendations
 */
router.get('/', (req, res) => {
  res.json('List of movies');
});

module.exports = router;
