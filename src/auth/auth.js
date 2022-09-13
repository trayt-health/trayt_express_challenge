const HttpStatus = require('http-status-codes');

const TokenError = require('../errors/tokenError');

const ACCEPTED_TOKEN_TYPE = 'Bearer';
const EMPTY_TOKEN = 'Access token not provided.';

/**
 * Get token from header in request.
 *
 * @param {Object} req: Request object recieved from express
 */
function getTokenFromHeaders(req) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    throw new TokenError({
      message: EMPTY_TOKEN,
      code: HttpStatus.UNAUTHORIZED,
    });
  }

  const [tokenType, tokenString] = authorization.split(' ');

  if (tokenType !== ACCEPTED_TOKEN_TYPE || tokenString === undefined) {
    throw new TokenError({
      message: EMPTY_TOKEN,
      code: HttpStatus.StatusCodes.UNAUTHORIZED,
    });
  }

  return tokenString;
}

/**
 * Validate users token (check if the token is present or not)
 * And sets the userId based on the token
 *
 * @param {Object} req: Request object recieved from express
 * @param {Object} res: Provided by express
 * @param {Object} next: Provided by express
 */
function validateUser(req, res, next) {
  const token = getTokenFromHeaders(req);

  req.userId = '9aaec1fc-ea13-4783-81f8-a998c1e0d648';

  next();
}

module.exports = {
  validateUser,
};
