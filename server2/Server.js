const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
