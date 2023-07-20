/* eslint-disable no-useless-escape */
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const regexUrl = /^(https?:\/\/)?([\w.-]+)\.([a-z][?=&%$#!*{2,6}\.?)(\/[\w.-]*)*\/?$/i;
module.exports = { regexEmail, regexUrl };
