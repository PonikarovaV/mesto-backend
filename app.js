const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const logger = require('./middlewares/logger');
const authorize = require('./middlewares/authorize');
const { resource, errorMiddleware } = require('./middlewares/error');
const users = require('./routes/users');
const cards = require('./routes/cards');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use(authorize);
app.use('/users', users);
app.use('/cards', cards);
app.use(resource);
app.use(errorMiddleware);

async function start() {
  try {
      await mongoose.connect(`mongodb://localhost:27017/mestodb`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
  }
  catch(err) {
      console.log(err);
  }
}

start();

