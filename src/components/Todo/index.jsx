import React from "react";
import "./styles.css";

export default function Todo({ todo }) {
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-content">
          <input
            type="text"
            value={todo.title === "" ? newTitle : todo.title}
            className="todo-list"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
