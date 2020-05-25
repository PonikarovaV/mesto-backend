const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  nameSchema,
  linkSchema,
} = require('../joiValidation/joiValidation');

const {
  getCards, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    link: linkSchema,
  }),
}), createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
