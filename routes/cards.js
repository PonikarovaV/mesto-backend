const router = require('express').Router();

const cards = require('../data/cards');

router.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Getting cards list');
  res.json(cards);
});

module.exports = router;
