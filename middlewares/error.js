const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || `Что-то пошло не так ${status}`;

  res.status(status).json({ message });
  next();
};

module.exports = errorMiddleware;
