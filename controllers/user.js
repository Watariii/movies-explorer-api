const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UniqueEmailError = require('../error/error-unique-email');
const AuthError = require('../error/error-auth');
const NotFoundError = require('../error/error-not-found');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
    new: true,
  })
    .orFail(() => new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.create({
        ...req.body,
        password: hashedPassword,
      })
        .then((user) => {
          res.status(201).send(user.hidePass());
        })
        .catch(() => {
          next(new UniqueEmailError('Пользователь с таким email уже зарегистрирован'));
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select({ email: 1, password: 1, name: 1 })
    .orFail(() => new AuthError('Авторизация с несуществующим пользователем в БД'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((match) => {
          if (match) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: 6048000 });
            res.cookie('jwt', token, {
              maxAge: 6048000,
              httpOnly: true,
              sameSite: true,
              secure: false,
            });
            res.status(200).send(user.hidePass());
          } else {
            throw new AuthError('Неверная почта или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.end();
};
module.exports = {
  getUser, createUser, login, updateUser, logout,
};
