const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: [true, 'Введите пожалуйста имя'],
    minlength: 2,
    maxlength: 30
  },
  about: String,
  avatar: String
});

module.exports = mongoose.model('user', userSchema);