/* eslint-disable no-useless-escape */
const regexUrl = /^(https?:\/\/)?([\w.-]+)\.([a-z][?=&%$#!*{2,6}\.?)(\/[\w.-]*)*\/?$/i;
module.exports = regexUrl;
