const { authenticateUser } = require("./userAuth");

const bearerTokenPrefix = "Bearer ";

/**
 * Middleware for authenticating users based on the authorization header.
 * Supports only Bearer tokens.
 */
function authenticateBearerTokenMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401)
            .json({ errorMessage: "Authorization header is required" });
    }

    if (!authHeader.startsWith(bearerTokenPrefix)) {
        return res.status(401)
            .json({ errorMessage: "Malformed authorization header - expected: Bearer <token>" });
    }

    const trimmedToken = authHeader.replace(bearerTokenPrefix, "");
    const currentUser = authenticateUser(trimmedToken);

    attachUserToRequest(req, currentUser);

    next();
}

function attachUserToRequest(req, currentUser) {
    req.currentUser = currentUser;
}

module.exports = authenticateBearerTokenMiddleware;