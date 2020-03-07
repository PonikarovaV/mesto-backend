const router = require('express').Router();

const { getCards, createCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
