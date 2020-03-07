const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  console.log('Getting cards list');

  Card.find({})
    .populate('user')
    .then(card => res.send({ cards: card }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.createCard = (req, res, next) => {
  console.log('Create card');

  const { name, link } = req.body;
  const _id = req.user._id;

  Card.create({ name, link, owner: _id })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'С карточками творится неладное...' }));
}