import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [newTodo, setNewTodo] = useState(""); // state for newTodo

  return (
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} /> {/* pass onAddTodo */}
      <p>New task: {newTodo}</p> {/* display newTodo */}
      <TodoList />
    </>
  );
}

export default App;
