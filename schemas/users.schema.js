const joi = require('joi');

const id = joi.string()
const idCard = joi.string().max(20);
const name = joi.string().min(5).max(50);
const lastname = joi.string().max(50);
const money = joi.number().min(10).max(10000000000);


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
