const joi = require("joi");

const chanNameSchema = joi.string().min(3).max(50).required();
const identifierSchema = joi.string().min(1).max(10).required();
const descriptionSchema = joi.string().min(50).max(2000).required();
const rulesSchema = joi.string().max(1000).required();
const visibilitySchema = joi.string().valid(...["public", "privileged", "private", "secret"]);
const colorSchema = joi
  .string()
  .pattern(/#[a-fA-F0-9]{6}/)
  .required();

const createChanSchema = joi.object({
  name: chanNameSchema,
  description: descriptionSchema,
  identifier: identifierSchema,
  color: colorSchema,
  rules: rulesSchema,
  visibility: visibilitySchema,
});

module.exports = createChanSchema;
