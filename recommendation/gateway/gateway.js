const recommendationsUsecase = require("../usecase/getUserRecommendation");

function getUserRecommendations(req, res) {
    const userID = getCurrentUserID(req);

    recommendationsUsecase.getUserRecommendations(userID)
        .then((recommendation) => res.json(recommendation))
}

function getCurrentUserID(req) {
    if (!req.currentUser) {
        throw new Error("Unexpected - current user should be authenticated and attached");
    }

    return req.currentUser.id;
}

module.exports = {
    getUserRecommendations: getUserRecommendations
};