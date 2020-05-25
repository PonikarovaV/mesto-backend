const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-error');

const key = process.env.JWT_SECRET || 'some-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Пожалуйста, пройдите авторизацию.'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new Unauthorized('Пожалуйста, пройдите авторизацию.'));
  }

  req.user = payload;

  return next();
};
