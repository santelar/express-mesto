const CardModel = require('../models/card');

const getCards = (req, res) => {
  CardModel.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({
      message: 'Ошибка на сервере',
    }));
};

const createCard = (req, res) => {
  CardModel.create({ ...req.body })
    .then((newCard) => res.status(200).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные новой карточки' });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  CardModel.findByIdAndRemove(req.params._id)
    .orFail(new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id карточки' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const likeCard = (req, res) => {
  CardModel.findByIdAndUpdate(req.params._id,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    })
    .orFail(new Error('NotFound'))
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id карточки' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const unlikeCard = (req, res) => {
  CardModel.findByIdAndUpdate(req.params._id,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    })
    .orFail(new Error('NotFound'))
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id карточки' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
