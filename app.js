/* eslint-disable no-console */
// eslint-disable-next-line import/order
const { PORT, DB_URL } = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
