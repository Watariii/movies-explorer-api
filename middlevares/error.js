const errorHandler = (err, req, res, next) => {
  if (err.statusCode === undefined) {
    res.status(500).send({ name: 'InternalServer', message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ name: err.name, message: err.message });
  }
  next();
};
module.exports = errorHandler;
