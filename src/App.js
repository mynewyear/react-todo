import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function useSemiPersistentState() {

  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }, [todoList]);

    return [todoList, setTodoList]
}

function App() {

  function addTodo(newTodo) {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  }

  const [todoList, setTodoList] = useSemiPersistentState();

  const removeTodo = (id) => {
    const updateList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateList);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
}

export default App;
