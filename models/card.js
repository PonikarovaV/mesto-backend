/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
/* eslint-disable space-before-function-paren */
/* eslint-disable object-shorthand */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function (string) {
        return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(string);
      },
      message: (props) => `${props.value} is not a valid name!`,
    },
    required: [true, 'Поле name обязательное'],
  },
  link: {
    type: String,
    validate: {
      validator: function (string) {
        return /^(https?:\/\/)?(www.)?((([a-zA-Z0-9\.\-]+)(\.(com|ru|edu|uk|gov|biz|net|org))+)|(([0-9]{1,3}\.){3}([0-9]{1,3})))(:[0-9]{2,5})?((\/[a-zA-Z0-9\?\\#\\%\\=\\&\)\(\.\-\\_]+(\/)?)+)?(#)?$/.test(string);
      },
      message: (props) => `${props.value} is not a valid URL!`,
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
