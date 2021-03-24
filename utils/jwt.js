const jwt = require('jsonwebtoken');
///////////////////////////
//////////////////////////
///////////////////////// JWT_SECRET_KEY ПЕРЕДЕЛАТЬ
const JWT_SECRET_KEY = 'very_secret';

const generateSign = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
}

// TODO Унести в middlewares/isAuthorized.js
const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Требуется авторизация' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    UserModel.findOne({ _id: payload._id })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'Пользователь не существует' });
        }

        next();
      })
      .catch(err => {
        return res.status(500).send({ message: 'Ошибка сервера' });
      });
  } catch (err) {
    return res.status(403).send({ message: 'Нет доступа' });
  }
}

module.exports = { generateSign, isAuthorized };