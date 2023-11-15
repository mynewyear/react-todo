import React, { useState, useEffect, useRef } from "react";

const AddTodoForm = ({ onAddTodo }) => { // accept onAddTodo as a prop
  const [todoTitle, setTodoTitle] = useState("");
  const inputRef = useRef(null);

  useEffect (() => {
    inputRef.current.focus();
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault(); // prevent the default behavior of the form submit
    onAddTodo({
      title: todoTitle,
      id: Date.now() // This is a placeholder; (need better way to generate unique ID)
    });
    setTodoTitle("");
    inputRef.current.focus(); //set focus for new todo
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title:</label>
        <br />
        <input
          ref={inputRef}
          type="text"
          id="todoTitle"
          name="title"
          required
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;