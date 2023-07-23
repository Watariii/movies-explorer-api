require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PORT, DB_URL } = require('./config');

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlevares/logger');
const errorHandler = require('./middlevares/error');
const limiter = require('./middlevares/limiter');

const NotFoundError = require('./error/error-not-found');

const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);
app.use((req, res, next) => {
  next(new NotFoundError('Ошибка запроса, не найден путь'));
});
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`Слушаю порт ${PORT}`);
});
