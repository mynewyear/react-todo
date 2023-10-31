import React from "react";

const TodoListItem = ({ todo }) => { // Destructuring todo directly in the function parameters
  if (!todo || todo.title === undefined) {
    return <li>Error: Todo item is missing or incomplete.</li>;
  }
  return (
    <li>{todo.title}</li>
  );
};

export default TodoListItem;