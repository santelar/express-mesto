const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const PORT = 3000;

app.use((req, res, next) => {
  req.user = {
    _id: '6037e8b179fc30137451f195',
  };

  next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
