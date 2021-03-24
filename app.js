const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { PORT = 3000} = process.env;
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestofull', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'ЗЗЗапрашиваемая страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
