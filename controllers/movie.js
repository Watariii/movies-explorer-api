const Movie = require('../models/movie');
const NotFoundError = require('../error/error-not-found');
const AllowsRightError = require('../error/error-allows-right');

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .orFail(() => new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (String(movie.owner) === String(req.user._id)) {
        movie.deleteOne();
        return res.status(200).send(movie);
      }
      throw new AllowsRightError('Невозможно удалить фильм');
    })
    .catch(next);
};
module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
