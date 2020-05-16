const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(string) {
        return validator.matches(string, /[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}/gi);
      },
      message: () => 'Поле name может содержать символы: A-Z, А-Я (верхнй или нижний регистр), цифры, пробел. Максимальная длина - 30.',
    },
    required: [true, 'Поле name обязательное'],
  },
  link: {
    type: String,
    validate: {
      validator(string) {
        return validator.isURL(string);
      },
      message: () => 'Поле avatar должно содержать ссылку.',
    },
    required: [true, 'Поле link обязательное'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
