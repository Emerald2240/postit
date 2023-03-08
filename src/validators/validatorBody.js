const joi = require("joi");

const validateBody = (schema) => (req, res, next) => {
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    return res.status(400).json({ validation: result.error.details });
  }
  next();
};

module.exports = {
  validateBody,
};
