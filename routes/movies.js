const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const {
  validPostCreateMovie,
  validDeleteMovie,
} = require('../utils/validRouteMovie');

router.get('/movies', getMovie);
router.post('/movies', celebrate(validPostCreateMovie), createMovie);
router.delete('/movies/:_id', celebrate(validDeleteMovie), deleteMovie);

module.exports = router;
