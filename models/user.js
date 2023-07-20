/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');
const { regexEmail } = require('../utils/constants');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    match: regexEmail,
  },

  password: {
    type: String,
    require: true,
    select: false,
  },

  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.methods.hidePass = function hidePasss() {
  const user = this.toObject();
  delete user._id;
  delete user.password;
  delete user.__v;
  return user;
};
module.exports = model('user', userSchema);
