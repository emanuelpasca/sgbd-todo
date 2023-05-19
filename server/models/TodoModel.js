const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    requires: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
