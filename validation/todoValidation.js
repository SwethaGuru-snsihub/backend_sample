// validation/todoValidation.js
const Joi = require("joi");

// We validate create / update payloads for the Todo API
const createTodoSchema = Joi.object({
  task: Joi.string().trim().min(1).required().messages({
    "string.empty": "task is required",
    "any.required": "task is required"
  }),
  status: Joi.string().valid("pending", "completed").optional(),
  due_date: Joi.date().optional().allow(null)
});

const updateTodoSchema = Joi.object({
  task: Joi.string().trim().min(1).optional(),
  status: Joi.string().valid("pending", "completed").optional(),
  due_date: Joi.date().optional().allow(null)
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
});

module.exports = {
  createTodoSchema,
  updateTodoSchema
};
