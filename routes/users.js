const router = require('express').Router();

const users = require('../data/users');
const User = require('../models/user');

router.get('/', (req, res) => {
  console.log('Getting users list');
  res.json(users);
});

router.get('/:userId', (req, res, next) => {
  console.log(`Getting user with id ${req.params.id}`);

  const foundUser = users.find((user) => user._id === req.params.id);

  if (!foundUser) {
    return next({ status: 404, message: 'Нет пользователя с таким id' });
  }

  return res.json(foundUser);
});

router.post('/', (req, res, next) => {
  console.log('Create user');

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
