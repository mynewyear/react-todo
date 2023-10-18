import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => { // Accept onAddTodo as a prop
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(todoTitle); // Call onAddTodo and pass todoTitle
    setTodoTitle("");
  };

  const handleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title:</label>
        <br />
        <input
          type="text"
          id="todoTitle"
          name="title"
          required
          value={todoTitle}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;