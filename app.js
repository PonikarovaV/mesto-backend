const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const logger = require('./middlewares/logger');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { resource, errorMiddleware } = require('./middlewares/error');
const { createUser, login } = require('./controllers/users');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoDB = process.env.MONGODB_URI;
const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use(resource);
app.use(errorLogger);
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
