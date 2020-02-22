const express = require('express');
const path = require('path');

const logger = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/error');
const users = require('./routes/users');
const cards = require('./routes/cards');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/cards', cards);
app.use((req, res, next) => {
  next({ status: 404, message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorMiddleware);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
