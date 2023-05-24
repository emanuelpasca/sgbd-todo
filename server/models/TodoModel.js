const mongoose = require("mongoose");

// Schema pentru colectia noastra de Todo
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    requires: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
