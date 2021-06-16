const joi = require("joi");
const emailSchema = joi.string().email().label("email").required();
const usernameSchema = joi
  .string()
  .label("username")
  .min(5)
  .max(20)
  .pattern(/[a-z0-9_]+/)
  .required();
const passwordSchema = joi.string().label("password").min(8).max(20).required();
const nameSchema = joi
  .string()
  .pattern(/[a-zA-Z]+/)
  .required();

const signupSchema = joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  first_name: nameSchema,
  last_name: nameSchema,
  gender: joi.string().valid("male", "female", "other"),
  birth_date: joi.date().less("now"),
});

const loginSchema = joi.object({
  username: [usernameSchema, emailSchema],
  password: passwordSchema,
  remember: joi.boolean().required(),
});

module.exports = {
  loginSchema,
  signupSchema,
};
