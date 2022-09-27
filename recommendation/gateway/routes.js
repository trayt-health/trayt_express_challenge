const express = require('express');
const router = express.Router();

const userAuthMiddleware = require("../../auth/middleware");

const recommendationsGateway = require("./gateway");

router.get('/', 
    userAuthMiddleware, 
    recommendationsGateway.getUserRecommendations
);

module.exports = router;
