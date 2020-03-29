/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('validator');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'security-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send({ message: 'Указан невалидный email' });
  }
  if (validator.isEmail(req.body.email)) {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      }))
      .then((user) => res.send({ data: user }))
      .catch((err) => { res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }); });
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const request = {};

  if (name) {
    request.name = name;
  }

  if (about) {
    request.about = about;
  }

  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
      }
      if (String(user._id) === String(req.user._id)) {
        User.update(user, request, { new: true, runValidators: true })
          .then(() => {
            res.send({ message: `Профиль пользователя ${user.name} успешно обновлен` });
          })
          .catch((err) => { res.status(400).send({ message: err.message }); });
      }
      if (String(user._id) !== String(req.user._id)) {
        return Promise.reject(new Error('Вы не можете менять чужой профиль'));
      }
    })
    .catch((err) => { res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }); });
};

module.exports.updateAvatar = (req, res) => {
  if (!(req.body.avatar)) {
    res.status(400).send({ message: 'Внесите данные' });
  } else {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
        }
        if (String(user._id) === String(req.user._id)) {
          User.update(user, { avatar: req.body.avatar }, { new: true, runValidators: true })
            .then(() => {
              res.send({ message: `Аватар пользователя ${user.name} успешно обновлен` });
            })
            .catch((err) => { res.status(400).send({ message: err.message }); });
        }
        if (String(user._id) !== String(req.user._id)) {
          return Promise.reject(new Error('Вы не можете менять чужой профиль'));
        }
      })
      .catch((err) => { res.status(500).send({ message: err.message || 'С пользователем что-то не так...' }); });
  }
};
