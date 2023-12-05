import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise ((resolve, reject) => 
      setTimeout(() => 
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        }),
       2000
       )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }

  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  }

  const removeTodo = (id) => {
    const updateList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateList);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {
        isLoading ? (
          <p>Loading ...</p>
        ):(
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
        )
      }
    </>
  );
}

export default App;
