const router = require('express').Router();

const users = require('../data/users');

router.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Getting users list');
  res.json(users);
});

router.get('/:id', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Getting user with id ${req.params.id}`);

  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((el) => el._id === req.params.id);

  if (!user) {
    return next({ status: 404, message: 'Нет пользователя с таким id' });
  }

  return res.json(user);
});

module.exports = router;
