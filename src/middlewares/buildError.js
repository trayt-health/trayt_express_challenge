const HttpStatus = require('http-status-codes');

const TokenError = require('../errors/tokenError');

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  if (err instanceof TokenError) {
    return {
      code: err.code ? err.code : HttpStatus.StatusCodes.BAD_REQUEST,
      message: err.message,
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(500),
  };
}

module.exports = buildError;
