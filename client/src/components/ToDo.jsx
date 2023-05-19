import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ToDo = (props) => {
  return (
    <div className="todo">
      <div className="text">{props.text}</div>
      <div className="icons">
        <BiEdit className="icon" onClick={props.updateMode}></BiEdit>
        <AiFillDelete
          className="icon"
          onClick={props.deleteTodo}
        ></AiFillDelete>
      </div>
    </div>
  );
};

export default ToDo;
