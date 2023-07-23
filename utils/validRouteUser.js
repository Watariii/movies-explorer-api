const { Joi } = require('celebrate');

const validPostCreateUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
};

const validPostLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const validPatchUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
};

module.exports = {
  validPostCreateUser,
  validPostLogin,
  validPatchUpdateUser,
};
