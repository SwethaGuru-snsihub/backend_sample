const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((d) => d.message.replace(/\"/g, '')).join(', ');
      return res.error(messages, 400);
    }

    req.body = value;
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);

    if (error) {
      const messages = error.details.map((d) => d.message.replace(/\"/g, '')).join(', ');
      return res.error(messages, 400);
    }

    next();
  };
};

module.exports = { validateRequestBody, validateParams };
