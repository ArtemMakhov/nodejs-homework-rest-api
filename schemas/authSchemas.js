const Joi = require("joi");

const schemaAuthValidation = Joi.object({
  password: Joi.string().min(3).max(18).required(),
  email: Joi.string().email().required(),
});

const schemaEmailValidation = Joi.object({
  email: Joi.string().email().required(),
})

module.exports = {
  schemaAuthValidation,
  schemaEmailValidation,
}