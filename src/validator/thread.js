const joi = require("joi");

const titleSchema = joi.string().min(10).max(200).required();
const idSchema = joi.alternatives([joi.number().empty("").allow(null), joi.string().regex(/\d{1,2}[\,\.]{1}/)]);

const threadCreateSchema = joi.object({
  title: titleSchema,
  chan_id: idSchema,
});

module.exports = threadCreateSchema;
