const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  console.log('Getting cards list');

  Card.find({})
    .populate('user')
    .then(card => res.send({ cards: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
}

module.exports.createCard = (req, res, next) => {
  console.log('Create card');

  const { name, link } = req.body;
  const _id = req.user._id;

  Card.create({ name, link, owner: _id })
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
}

module.exports.likeCard = (req, res) => {
  console.log(`Put like to ${req.params.cardId}. User ${req.user._id}`);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
}

module.exports.dislikeCard = (req, res) => {
  console.log(`Delete like from ${req.params.cardId}. User ${req.user._id}`);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'С карточками творится неладное...' }));
}
