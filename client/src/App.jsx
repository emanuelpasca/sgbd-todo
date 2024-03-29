import { useEffect, useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./utils/APIHandler";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoID, setTodoID] = useState("");
  const [selectedDatabase, setSelectedDatabse] = useState("");

  /*
    La fiecare randare  a aplicatiei sunt luate
    din baza de date si este setata baza de date selectata
  */
  useEffect(() => {
    getTodos(setTodo);
    setSelectedDatabse(localStorage.getItem("selectedDatabase") || "mongodb");
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoID(_id);
  };

  /*
  Functia cu care la fiecare modificare a select-ului
  se seteaza in localstorage selectedDatabase si se da 
  refresh la pagina
  */
  const handleDatabaseChange = (event) => {
    localStorage.setItem("selectedDatabase", event.target.value);
    window.location.reload();
  };

  return (
    <div className="App">
      <select
        className="database-select"
        value={localStorage.getItem("selectedDatabase")}
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
              isUpdating // daca sunt in modul de update se va apela functia updateTodo altfel addtodo
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
              key={selectedDatabase === "mongodb" ? item._id : item.elementId}
              text={
                selectedDatabase === "mongodb"
                  ? item.text
                  : item.properties.text
              }
              updateMode={() =>
                updateMode(
                  selectedDatabase === "mongodb" ? item._id : item.elementId,
                  selectedDatabase === "mongodb"
                    ? item.text
                    : item.properties.text
                )
              }
              deleteTodo={() =>
                deleteTodo(
                  selectedDatabase === "mongodb" ? item._id : item.elementId,
                  setTodo
                )
              }
            ></ToDo>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
