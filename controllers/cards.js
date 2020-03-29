/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((card) => res.send({ cards: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      if (String(card.owner) === String(req.user._id)) {
        Card.deleteOne(card)
          .then(() => {
            res.send({ message: `Карточка с id ${req.params.cardId} успешно и безвозвратно удалена` });
          });
      }
      if (String(card.owner) !== String(req.user._id)) {
        return Promise.reject(new Error('Вы не можете удалить карточку'));
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
};
