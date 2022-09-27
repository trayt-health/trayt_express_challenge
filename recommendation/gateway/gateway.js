function getUserRecommendations(req, res) {
    if (!req.currentUser) {
        throw new Error("Unexpected - current user should be authenticated and attached");
    }

    throw new Error("getRecommendations unimplemented");
}

module.exports = {
    getUserRecommendations
};