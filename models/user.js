/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
/* eslint-disable space-before-function-paren */
/* eslint-disable object-shorthand */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function(string) {
        return /^[a-zA-Zа-яёА-ЯЁ0-9\s]+$/.test(string);
      },
      message: (props) => `${props.value} is not a valid name!`,
    },
    required: [true, 'Поле name обязательное'],
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function(string) {
        return /^[a-zA-Zа-яёА-ЯЁ0-9\s]+$/.test(string);
      },
      message: (props) => `${props.value} is not a valid field!`,
    },
    required: [true, 'Поле about обязательное'],
  },
  avatar: {
    type: String,
    validate: {
      validator: function(string) {
        return /^(https?:\/\/)?(www.)?((([a-zA-Z0-9\.\-]+)(\.[a-z]{2,64})+)|(([0-9]{1,3}\.){3}([0-9]{1,3})))(:[0-9]{2,5})?((\/[a-zA-Z0-9\?\\#\\%\\=\\&\)\(\.\-\\_]+(\/)?)+)?(#)?$/.test(string);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
