const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function (string) {
        return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(string);
      },
      message: props => `${props.value} is not a valid name!`
    },
    required: true
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function (string) {
        return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(string);
      },
      message: props => `${props.value} is not a valid name!`
    },
    required: true
  },
  avatar: {
    type: String,
    validate: {
      validator: function (string) {
        return /^(https?:\/\/)?(www.)?((([a-zA-Z0-9\.\-]+)(\.(com|ru|edu|uk|gov|biz|net|org))+)|(([0-9]{1,3}\.){3}([0-9]{1,3})))(:[0-9]{2,5})?((\/[a-zA-Z0-9\?\\#\\%\\=\\&\)\(\.\-\\_]+(\/)?)+)?(#)?$/.test(string);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  }
});

module.exports = mongoose.model('user', userSchema);