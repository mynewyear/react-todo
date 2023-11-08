import React from "react";
import TodoListItem from "./TodoListItem";
  
function TodoList({ todoList }) {
  return (
    <>
      <ul>
        {todoList.map(function ({ id, title }) {
          return (
            <TodoListItem key={id} todo={title} />
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
