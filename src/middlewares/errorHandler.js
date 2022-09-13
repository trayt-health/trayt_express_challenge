const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');
const buildError = require('./buildError');

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
function methodNotAllowed(req, res) {
  res.status(HttpStatus.StatusCodes.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.StatusCodes.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText('Method not allowed'),
    },
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res, next) {
  const error = buildError(err);

  res.status(error.code).json({ error });
}

module.exports = {
  genericErrorHandler,
  methodNotAllowed,
};
