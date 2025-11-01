const Joi = require('joi');

// Id params Validator
const editUserValidator = Joi.object({
  name: Joi.string().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Valid email is required',
    'string.empty': 'Email is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      'string.pattern.base': 'Phone number must be valid',
      'string.empty': 'Phone number is required',
    }),
});

//userId validator
const userIdValidator= Joi.object({
  userId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.length': 'User ID must be a valid 24-character hex string',
      'string.hex': 'User ID must be a valid hex string',
      'any.required': 'User ID is required',
    }),
});

//

module.exports = { editUserValidator,userIdValidator };
