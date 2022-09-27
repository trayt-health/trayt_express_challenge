const express = require('express');
const router = express.Router();

const recommendationsGateway = require("./gateway");
router.get('/', recommendationsGateway.getRecommendations);

module.exports = router;
