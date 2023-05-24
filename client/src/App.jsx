import { useEffect, useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./utils/APIHandler";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoID, setTodoID] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("mongodb");

  useEffect(() => {
    getTodos(setTodo);
  }, [selectedDatabase]);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoID(_id);
  };

  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  return (
    <div className="App">
      <select
        className="database-select"
        value={selectedDatabase}
        onChange={handleDatabaseChange}
      >
        <option value="arangodb">ArangoDB</option>
        <option value="mongodb">MongoDB</option>
      </select>
      <h1 className="h1-container">ToDo App</h1>
      <div className="container">
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateTodo(todoID, text, setTodo, setText, setIsUpdating)
                : () => addTodo(text, setText, setTodo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => deleteTodo(item._id, setTodo)}
            ></ToDo>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
