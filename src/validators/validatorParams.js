const joi = require("joi");

const validateParams = (schema) => (req, res, next) => {
  const result = schema.validate(req.params, { abortEarly: false });
  if (result.error) {
    return res.status(400).json({ validation: result.error.details, source: "validateparams" });
  }
  next();
};

module.exports = {
  validateParams,
};
