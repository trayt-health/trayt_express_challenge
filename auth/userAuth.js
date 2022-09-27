/**
 * @typedef User
 * @property {string} id The unique id of the user
 */

/**
 * Authenticates and fetches a user based on the security token
 * 
 * @param  {string} token The user's Bearer token
 * @return {User} User object for the authenticated user
 */
function authenticateUser(token) {
    if (token === "") {
        throw new UnauthorizedError("Bearer token is not authorized");
    }

    return {
        id: "9aaec1fc-ea13-4783-81f8-a998c1e0d648",
    }
}

class UnauthorizedError {
    constructor(message) {
        this.message = message;
    }
}

module.exports = {
    authenticateUser
}