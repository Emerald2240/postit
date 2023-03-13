//validates a joi schema with values passed to it inside the res.params. Moves to the next middleware if match, sends an error response to the user if it doesnt
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
