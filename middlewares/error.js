module.exports.resource = (res, req, next) => {
  next({ status: 404, message: 'Запрашиваемый ресурс не найден' });
};

module.exports.errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || `Что-то пошло не так ${status}`;
  res.status(status).json({ error });
  next();
};
