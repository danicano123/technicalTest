const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(5).max(20);
const color = joi.string().max(20);
const price = joi.number().min(100).max(1000000);
const img = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  color: color.required(),
  price: price.required(),
  img: img.required(),
});

const updateProductSchema = joi.object({
  name,
  color,
  price,
  img,
});

const findProductSchema = joi.object({
  id: id.required(),
});

module.exports = {
  findProductSchema,
  createProductSchema,
  updateProductSchema,
};
