const { Joi } = require('celebrate');
const regexUrl = require('./constants');

const validPostCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrl),
    trailerLink: Joi.string().required().regex(regexUrl),
    thumbnail: Joi.string().required().regex(regexUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),

  }),
};

const validDeleteMovie = {
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
};

module.exports = {
  validPostCreateMovie,
  validDeleteMovie,
};
