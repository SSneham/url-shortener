function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational === true;

  if (!isOperational) {
    console.error('Unexpected error:', err);
  }

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal Server Error' : err.message,
    message: isOperational ? err.message : 'An unexpected error occurred',
  });
}

module.exports = errorHandler;
