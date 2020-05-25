const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((card) => res.send({ cards: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError(`Карточка с id ${req.params.cardId} не найдена.`))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError(`Карточка с id ${req.params.cardId} не найдена.`))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError(`Карточка с id ${req.params.cardId} не найдена.`))
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить карточку.');
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.send({ message: `Карточка с id ${req.params.cardId} успешно и безвозвратно удалена.` });
          });
      }
    })
    .catch(next);
};
