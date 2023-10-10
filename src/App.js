import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {

  return(
    <>
      <h1>ToDo List</h1>
      <AddTodoForm />
      <TodoList />
    </>
  )

};

export default App;
