//validates a joi schema with values passed to it inside the res.body. Moves to the next middleware if match, sends an error response to the user if it doesnt
const validateBody = (schema) => (req, res, next) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({ validation: result.error.details, source: "validatebody" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid input", success: false });
  }
};


module.exports = {
  validateBody,
};
