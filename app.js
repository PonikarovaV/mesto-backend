const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/error');
const usersRout = require('./routes/usersRout');
const cardsRout = require('./routes/cardsRout');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use(usersRout);
app.use(cardsRout);
app.use( (req, res, next) => {
  next( { status: 404, error: 'Страница не найдена' } );
});
app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});