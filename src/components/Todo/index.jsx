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
          <img
            src="https://firebasestorage.googleapis.com/v0/b/carine-lima.appspot.com/o/posts?alt=media&token=42b111b2-d8f2-45eb-9be8-ba92aa385f05"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
