const Todo = require("../models/todoModel");
const { asyncHandler, sendSuccess } = require("../utils");
const { CREATED, OK } = require("../constants/statusCodes");
const { messages } = require("../constants");
const { NotFoundError } = require("../errors");

/**
 * Create a new todo
 * @route POST /api/todo/create
 * @access Public
 */
const createTodo = asyncHandler(async (req, res) => {
  const { task, status, due_date } = req.body;

  const todo = new Todo({
    task,
    status: status || "pending",
    due_date: due_date || null
  });

  const savedTodo = await todo.save();

  return sendSuccess(res, CREATED, messages.TODO_CREATED, savedTodo);
});

/**
 * Get all todos
 * @route GET /api/todo/list
 * @access Public
 */
const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().sort({ created_date: -1 });

  return sendSuccess(res, OK, messages.TODO_LIST_RETRIEVED, todos, {
    count: todos.length
  });
});

/**
 * Update a todo by ID
 * @route PUT /api/todo/update/:id
 * @access Public
 */
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { task, status, due_date } = req.body;

  const todo = await Todo.findById(id);
  
  if (!todo) {
    throw new NotFoundError(messages.TODO_NOT_FOUND);
  }

  // Update fields if provided
  if (task !== undefined) todo.task = task;
  if (status !== undefined) todo.status = status;
  if (due_date !== undefined) todo.due_date = due_date;

  const updatedTodo = await todo.save();

  return sendSuccess(res, OK, messages.TODO_UPDATED, updatedTodo);
});

/**
 * Delete a todo by ID
 * @route DELETE /api/todo/delete/:id
 * @access Public
 */
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);
  
  if (!todo) {
    throw new NotFoundError(messages.TODO_NOT_FOUND);
  }

  return sendSuccess(res, OK, messages.TODO_DELETED, todo);
});

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo
};

