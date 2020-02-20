const router = require('express').Router();

const cards = require('../data/cards');

router.get('/cards', (req, res) => {
  console.log(`Getting cards list`);
  res.json(cards);
});

module.exports = router;