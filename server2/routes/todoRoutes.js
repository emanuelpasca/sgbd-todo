const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getAllTodos);
router.get("/todo", todoController.getTodoById);
router.post("/save", todoController.createTodo);
router.post("/update", todoController.updateTodo);
router.post("/delete", todoController.deleteTodo);

module.exports = router;
