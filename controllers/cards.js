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
        res.status(400).send({ message: 'Введите имя от 2 до 30 символов' });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  CardModel.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (card) {
        res.send(card);
        return;
      }
      res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((error) => res.status(500).send({ message: `Ошибка на сервере: ${error.message}` }));
};

const likeCard = (req, res) => {
  CardModel.findByIdAndUpdate(req.params._id,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    })
    .then((result) => {
      if (result) {
        res.send({ data: result });
        return;
      }
      res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const unlikeCard = (req, res) => {
  CardModel.findByIdAndUpdate(req.params._id,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    })
    .then((result) => {
      if (result) {
        res.send({ data: result });
        return;
      }
      res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
