const CustomError = require('./CustomError');

/**
 * Error class for Token Error.
 */
class TokenError extends CustomError {
  constructor({ message = '', data = '', code = 401 }) {
    super({ message, data, code });
  }
}

module.exports = TokenError;
