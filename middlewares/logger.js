const logger = (req, res, next) => {
  const time = new Date();
  // eslint-disable-next-line no-console
  console.log(time, req.method, req.path);
  next();
};

module.exports = logger;
