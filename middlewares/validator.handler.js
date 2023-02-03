const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); // abortEarly hace que imprima todos los errores  y no solo uno por uno
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};

module.exports = validatorHandler;
