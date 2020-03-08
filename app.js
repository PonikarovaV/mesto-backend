const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const logger = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/error');
const users = require('./routes/users');
const cards = require('./routes/cards');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
      _id: '5e616d18d954b4760ac82531'
  };
  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.use((req, res, next) => {
  next({ status: 404, message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorMiddleware);

async function start() {
  try {
      await mongoose.connect('mongodb://localhost:27017/mestodb', {
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

