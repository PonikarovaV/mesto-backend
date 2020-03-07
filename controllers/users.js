const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  console.log(`Getting user list`);

  User.find({})
  .then(directors => res.send({ data: directors }))
  .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.getUser = (req, res, next) => {
  console.log(`Getting user with id ${req.params.userId}`);

  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.createUser = (req, res) => {
  console.log('Create user');

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'С пользователем что-то не так...' }));
}