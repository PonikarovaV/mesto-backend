const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const errorMessage = err.error || `Что-то пошло не так ${status}`;

  res.status(status).send(errorMessage);
};

module.exports = errorMiddleware;