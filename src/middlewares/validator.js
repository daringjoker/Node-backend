const joi = require("joi");
const { sendFailure } = require("../utiliities/responses");
function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      sendFailure(res, "invalid request data / format", error);
    } else {
      next();
    }
  };
}

module.exports = validateSchema;
