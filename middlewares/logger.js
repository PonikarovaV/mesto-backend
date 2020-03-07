const logger = (req, res, next) => {
  const time = new Date();

  console.log(time, req.method, req.path);
  next();
};

module.exports = logger;
