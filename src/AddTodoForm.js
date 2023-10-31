import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => { // accept onAddTodo as a prop
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault(); // prevent the default behavior of the form submit
    onAddTodo({
      title: todoTitle,
      id: Date.now() // This is a placeholder; (need better way to generate unique ID)
    });
    setTodoTitle("");
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
          onChange={(event) => setTodoTitle(event.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;