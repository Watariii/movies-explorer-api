const express = require('express');
const mongoose = require('mongoose');

// process.env
const { PORT, DB_URL } = require('./config');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
