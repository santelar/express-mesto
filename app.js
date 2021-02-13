const { static } = require('express');
const express = require ('express');
const path = require('path');
const usersRouter= require('./routes/users.js');
const cardsRouter= require('./routes/cards.js');
const app = express();


const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT, () => {
    console.log(`App starting on port ${PORT}`);

});