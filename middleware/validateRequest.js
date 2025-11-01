// Generic middleware to validate request body using a Joi schema passed in.
module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, convert: true });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ statusCode: 400, message: "Validation failed", errors: details });
    }
    next();
  };
};
