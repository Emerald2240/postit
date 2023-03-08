const joi = require("joi");

const validateBody = (schema) => (req, res, next) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    return res.status(400).json({ validation: result.error.details });
  }
  next();
  } catch (error) {
    return res.status(400).json({message: "Invalid input", success: false});
  }
};

module.exports = {
  validateBody,
};
