import axios from "axios";

const selectedDatabase = localStorage.getItem("selectedDatabase") || "mongodb";
const API_URL = `http://localhost:${
  selectedDatabase === "mongodb" ? "5000" : "5001"
}`;

const getTodos = (setTodo) => {
  axios
    .get(API_URL)
    .then(({ data }) => {
      setTodo(data);
    })
    .catch((err) => console.log(err));
};

const addTodo = (text, setText, setTodo) => {
  axios
    .post(`${API_URL}/save`, { text })
    .then(({ data }) => {
      console.log(data);
      setText("");
      getTodos(setTodo);
    })
    .catch((err) => console.log(err));
};

const updateTodo = (todoID, text, setTodo, setText, setIsUpdating) => {
  axios
    .post(`${API_URL}/update`, { id: todoID, text })
    .then(() => {
      setText("");
      setIsUpdating(false);
      getTodos(setTodo);
    })
    .catch((err) => console.log(err));
};

const deleteTodo = (todoID, setTodo) => {
  axios
    .post(`${API_URL}/delete`, { id: todoID })
    .then(() => {
      getTodos(setTodo);
    })
    .catch((err) => console.log(err));
};

export { getTodos, addTodo, updateTodo, deleteTodo };
