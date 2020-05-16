/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

require('dotenv').config();

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.SECURE_KEY, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (!validator.matches(password, /[a-zA-Z0-9*]{8,15}/gi)) {
    throw new BadRequestError('Поле password может содержать символы: *, a-z, A-Z, 0-9.');
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      }))
      .then((user) => res.send({ name: user.name, about: user.about, email: user.email }))
      .catch(next);
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id ${req.params.userId} не найден`);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const request = {};

  if (req.body.name) {
    request.name = req.body.name;
  }

  if (req.body.about) {
    request.about = req.body.about;
  }

  if (request.name !== undefined || request.about !== undefined) {
    User.findByIdAndUpdate(req.user._id, request, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          throw new NotFoundError(`Пользователь с id ${req.user._id} не найден`);
        } else {
          res.send({ user });
        }
      })
      .catch(next);
  } else {
    throw new BadRequestError('Поля должны быть корректно заполнены');
  }
};

module.exports.updateAvatar = (req, res, next) => {
  if (!(req.body.avatar)) {
    throw new BadRequestError('Поле avatar должно содержать ссылку');
  } else {
    User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          throw new NotFoundError(`Пользователь с id ${req.user._id} не найден`);
        } else {
          res.send({ message: 'Аватар пользователя успешно обновлен' });
        }
      })
      .catch(next);
  }
};
