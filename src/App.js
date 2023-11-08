import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(newTodo) {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
