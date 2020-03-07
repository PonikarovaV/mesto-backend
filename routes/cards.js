const router = require('express').Router();

const cards = require('../data/cards');
const Card = require('../models/card');

router.get('/', (req, res) => {
  console.log('Getting cards list');

  Card.find({})
    .populate('user')
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
  res.json(cards);
});

router.post('/', (req, res, next) => {
  console.log('Create card');

  const { name, link } = req.body;
  const _id = req.user._id;

  Card.create({ name, link, owner: _id })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
