const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  nameUpdateSchema,
  aboutUpdateSchema,
  linkSchema,
} = require('../joiValidation/joiValidation');

const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: nameUpdateSchema,
    about: aboutUpdateSchema,
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: linkSchema,
  }),
}), updateAvatar);

module.exports = router;
