const UserModel = require('../models/user');
const { isAuthorized } = require('../utils/jwt');

const getUsers = (req, res) => {
  return UserModel.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getUser = (req, res) => {
  UserModel.findById(req.params._id)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id пользователя' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const createUser = (req, res) => {
  UserModel.create({ ...req.body })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(req);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  UserModel.findByIdAndUpdate({ _id: req.user._id },
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    })
    .orFail(new Error('NotFound'))
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id пользователя' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    })
    .orFail(new Error('NotFound'))
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id пользователя' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
