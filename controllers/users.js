const UserModel = require('../models/user');

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getUser = (req, res) => {
  console.log(req.params);
  UserModel.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Файл не найден' }));
};

const createUser = (req, res) => {
  UserModel.create({ ...req.body })
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        if (err.errors && err.errors.name && err.errors.name.kind === 'minlength') {
          res.status(400).send({ message: 'Введите имя от 2 до 30 символов' });
        } else {
          res.status(400).send({ message: 'Неправильные данные' });
        }
      }
      res.status(500).send({ message: 'Не удалось создать пользователя' });
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
    .then((result) => {
      console.log(req.body);
      res.send(result);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Неправильные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
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
    .then((result) => res.send({ data: result }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Неправильные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
