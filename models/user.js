const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите пожалуйста имя'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /https?:\/\/(www\.)?[-./a-zA-Z0-9]+\.[-./a-zA-Z0-9]+#?/;
        return regex.test(link);
      },
      message: 'Некорректный адрес!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
