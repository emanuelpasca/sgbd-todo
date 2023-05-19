import axios from "axios";

const API_URL = "http://localhost:5000";

const getTodos = (setTodo) => {
  axios
    .get(API_URL)
    .then(({ data }) => {
      console.log("Data fetched!");
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
    .post(`${API_URL}/update`, { _id: todoID, text })
    .then(() => {
      setText("");
      setIsUpdating(false);
      getTodos(setTodo);
    })
    .catch((err) => console.log(err));
};

const deleteTodo = (todoID, setTodo) => {
  axios
    .post(`${API_URL}/delete`, { _id: todoID })
    .then(() => {
      getTodos(setTodo);
    })
    .catch((err) => console.log(err));
};

export { getTodos, addTodo, updateTodo, deleteTodo };
