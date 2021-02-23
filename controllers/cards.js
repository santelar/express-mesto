const path = require('path');
const CardModel = require('../models/card');

const getCards = (req, res) => {
  CardModel.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err))
}

const createCard = (req, res) => {
  console.log(...req.body);
  CardModel.create({ ...req.body })
  .then(card => {
    res.status(200).send(card);
  })
  .catch(err => {
    if(err.name === 'ValidationError') {
      if (err.errors && err.errors.name && err.errors.name.kind === 'minlength') {
        res.status(400).send({ message: 'Введите имя от 2 до 30 символов' });
      } else {
        res.status(400).send({ message: 'Неправильные данные' });
      }
    }
    res.status(500).send({ message: 'Не удалось создать пользователя' });
  });
}

module.exports = { getCards, createCard };
