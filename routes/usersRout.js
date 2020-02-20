const router = require('express').Router();
const users = require('../data/users');

router.get('/users', (req, res, next) => {
  console.log(`Getting users list`);
  res.json(users);
});

router.get('/users/:id', (req, res, next) => {
  console.log(`Getting user with id ${req.params.id}`);

  const found = users.some( user => user._id === req.params.id );

  if (!found) {
    return next({ status: 400, error: `Пользователь с id ${req.params.id} не найден` });
  }

  res.json(users.filter( user => user._id === req.params.id));

});

module.exports = router;