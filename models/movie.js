const { Schema, model } = require('mongoose');
const regexUrl = require('../utils/constants');

const movieSchema = new Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    match: regexUrl,
  },
  trailerLink: {
    type: String,
    require: true,
    match: regexUrl,
  },

  thumbnail: {
    type: String,
    require: true,
    match: regexUrl,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});
module.exports = model('movie', movieSchema);
