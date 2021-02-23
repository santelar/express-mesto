const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: [true, 'Введите пожалуйста название'],
    minlength: 2,
    maxlength: 30
  },
  link: {
    name: String
  },
  owner: String,
  likes: {
    type: Array
  },
  createdAt: Date
});

module.exports = mongoose.model('card', cardSchema);