const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser, createUser, login, updateUser, logout,
} = require('../controllers/user');
const auth = require('../middlevares/auth');

const {
  validPostCreateUser,
  validPostLogin,
  validPatchUpdateUser,
} = require('../utils/validRouteUser');

router.post('/signup', celebrate(validPostCreateUser), createUser);
router.post('/signin', celebrate(validPostLogin), login);

router.use(auth);

router.get('/users/me', getUser);
router.patch('/users/me', celebrate(validPatchUpdateUser), updateUser);

router.get('/signout', logout);

module.exports = router;
