const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error('Пользователь с таким id не найден'))
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
    .orFail(() => new Error('Пользователь с таким id не найден'))
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
        .catch((err) => {
          res.status(400).send({ name: err.name, message: err.message });
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select({ email: 1, password: 1, name: 1 })
    .orFail(() => new Error('Авторизация с несуществующими email и password в БД'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((match) => {
          if (match) {
            const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: 6048000 });
            res.cookie('jwt', token, {
              maxAge: 6048000,
              httpOnly: true,
              sameSite: true,
              secure: false,
            });
            res.status(200).send(user.hidePass());
          } else {
            throw new Error('Неверная почта или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};
module.exports = {
  getUser, createUser, login, updateUser,
};
