const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(10).max(40);
const personalId = joi.number().id().min(9).max(10);
const contactNumber = joi.number().min(10).max(13);
const img = joi.string().uri();

const createClientSchema = joi.object({
  name: name.required(),
  personalId: personalId.required(),
  contactNumber: contactNumber.required(),
});

const updateClientSchema = joi.object({
  name,
  personalId,
  contactNumber,
  img,
});

const findClientSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createClientSchema,
  updateClientSchema,
  findClientSchema,
};
