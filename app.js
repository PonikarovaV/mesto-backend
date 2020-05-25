const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const {
  emailSigninSchema,
  passwordSigninSchema,
  emailSignupSchema,
  passwordSignupSchema,
  nameSchema,
  aboutSchema,
  avatarSchema,
} = require('./joiValidation/joiValidation');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { resource, errorMiddleware } = require('./middlewares/error');
const { createUser, login } = require('./controllers/users');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');

const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/mestodb';
const port = process.env.PORT || 3000;

const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: emailSigninSchema,
    password: passwordSigninSchema,
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: emailSignupSchema,
    password: passwordSignupSchema,
    name: nameSchema,
    about: aboutSchema,
    avatar: avatarSchema,
  }),
}), createUser);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use(resource);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);


async function start() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
