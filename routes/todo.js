const express = require("express");
const router = express.Router();
const {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

router.post("/create", createTodo);
router.get("/list", getAllTodos);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
