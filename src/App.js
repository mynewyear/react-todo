import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";


function App() {
  

  const [todoList, setTodoList] = useState(() => {
  const savedTodoList = localStorage.getItem("savedTodoList");
     return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  function addTodo(newTodo) {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  }

  useEffect(() => {
       localStorage.setItem('savedTodoList', JSON.stringify(todoList));
     }, [todoList]);

  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
