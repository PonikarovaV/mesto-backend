const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  console.log(`Getting user list`);

  User.find({})
  .then(users => res.send({ data: users }))
  .catch((err) => res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }));
}

module.exports.getUser = (req, res, next) => {
  console.log(`Getting user with id ${req.params.userId}`);

  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }));
}

module.exports.createUser = (req, res) => {
  console.log('Create user');

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {res.status(500).send({ message: err.message || 'С пользователем что-то не так...' })});
}

module.exports.updateUser = (req, res) => {
  console.log(`Update profile ${req.user._id} with name ${req.body.name} and about ${req.body.about}`);

  const { name, about } = req.body;
  console.log({ name, about })

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {res.status(500).send({ message: err.message || 'С пользователем что-то не так...' })});
}

module.exports.updateAvatar = (req, res) => {
  console.log(`Update avatar ${req.user._id} with link ${req.body.avatar}`);

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {res.status(500).send({ message: err.message || 'С пользователем что-то не так...' })});
}