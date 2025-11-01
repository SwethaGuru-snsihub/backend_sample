const express = require("express");
const { validateRequestBody, validateParams } = require('../middleware/joiValidation');
const router = express.Router();
const {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");
const { validateRequest } = require("../middleware");
const { createTodoSchema, updateTodoSchema } = require("../validation/todoValidation");

router.post("/create", validateRequest(createTodoSchema), createTodo);
router.get("/list", getAllTodos);
router.put("/update/:id", validateRequest(updateTodoSchema), updateTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
