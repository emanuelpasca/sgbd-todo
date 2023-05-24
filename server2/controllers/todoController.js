const Todo = require("../models/todo");

// Aici avem functiile care se vor ocupa de operatiile CRUD

exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const createdTodo = await Todo.create(text);
    res.send(createdTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.send(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.getById(id);
    res.send(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const { text } = req.body;
    const updatedTodo = await Todo.update(id, text);
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    await Todo.delete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
