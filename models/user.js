const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function (string) {
        return /^[a-zA-Zа-яёА-ЯЁ0-9\s]+$/.test(string);
      },
      message: props => `${props.value} is not a valid name!`
    },
    required: [true, 'Поле name обязательное']
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function (string) {
        return /^[a-zA-Zа-яёА-ЯЁ0-9\s]+$/.test(string);
      },
      message: props => `${props.value} is not a valid field!`
    },
    required: [true, 'Поле about обязательное']
  },
  avatar: {
    type: String,
    validate: {
      validator: function (string) {
        return /^(https?:\/\/)?(www.)?((([a-zA-Z0-9\.\-]+)(\.[a-z]{2,64})+)|(([0-9]{1,3}\.){3}([0-9]{1,3})))(:[0-9]{2,5})?((\/[a-zA-Z0-9\?\\#\\%\\=\\&\)\(\.\-\\_]+(\/)?)+)?(#)?$/.test(string);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
});

module.exports = mongoose.model('user', userSchema);