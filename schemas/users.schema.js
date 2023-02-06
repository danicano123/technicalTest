const joi = require('joi');

const id = joi.string().uuid();
const idCard = joi.string();
const name = joi.string().min(5).max(20);
const lastname = joi.string().max(20);
const money = joi.number().min(10).max(10000000);


const createUserSchema = joi.object({
  idCard: idCard.required(), 
  name: name.required(),
  lastname: lastname.required(),
  money: money.required(),
});

const updateUserSchema = joi.object({
  name,
  lastname,
  money,
});

const findUserSchema = joi.object({
  id: id.required(),
});

module.exports = {
  findUserSchema,
  createUserSchema,
  updateUserSchema,
};
