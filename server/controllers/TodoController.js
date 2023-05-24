const TodoModel = require("../models/TodoModel");

module.exports.getTodo = async (req, res) => {
  const todo = await TodoModel.find();
  res.send(todo);
};

module.exports.saveTodo = async (req, res) => {
  const { text } = req.body;

  TodoModel.create({ text: text })
    .then((data) => {
      console.log("Added succesfully");
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.updateTodo = async (req, res) => {
  const { id: _id, text } = req.body;
  TodoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Updated Succesfully"))
    .catch((err) => console.log(err));
};

module.exports.deleteTodo = async (req, res) => {
  const { id: _id } = req.body;
  TodoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Succesfully"))
    .catch((err) => console.log(err));
};
