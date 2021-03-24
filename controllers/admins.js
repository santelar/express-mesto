const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;
const { generateSign, isAuthorized } = require('../utils/jwt');

const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Не передан емейл или пароль' });
  }

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => UserModel.create({
      email,
      password: (hash),
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(err => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        res.status(409).send({ message: 'Такой пользователь уже существует' });
      }

      res.status(500).send({ message: 'Не удалось зарегистрировать пользователя' });
    })
}

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Не передан емейл или пароль" });
  }

  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "Неверный емейл или пароль" });
      }
      userId = user._id;
      return bcrypt.compare(password, user.password)
    })
    .then((matched) => {
      if (!matched) {
        return res.status(400).send({ message: "Неверный емейл или пароль" });
      }
      const token = jwt.sign({ _id: userId }, 'hardkey', {expiresIn: '7d'});
      return res.status(200).send({ token });
    })
    .catch (err => {
      console.log(err);
      res.status(500).send({ message: 'Не удалось авторизовать пользователя' });
    })
}

module.exports = { registerUser, loginUser };
