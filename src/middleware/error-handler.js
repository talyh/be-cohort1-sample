const { logger } = require("../utils/logger");

const ERROR_CODES = {
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const errorHandler = (err, req, res, next) => {
  console.log("raw", err);
  const error = JSON.parse(err.message);
  console.log("error", error);
  logger.error(error.status);
  if (!error.status) error.status = ERROR_CODES.INTERNAL_SERVER_ERROR;
  res.status(error.status).json(error.message);
};

module.exports = {
  errorHandler,
  ERROR_CODES
};
