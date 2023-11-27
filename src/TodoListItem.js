import React from "react";

const TodoListItem = ({ id, todo, onRemoveTodo }) => {
  if (!todo) { // Check if todo exist
    return <li>Error: Todo item is missing or incomplete.</li>;
  } 
  return (
      <li key={id}>
        {todo} 
        <button type="button" onClick={() => onRemoveTodo(id)}>Remove</button>
      </li>
  );
};

export default TodoListItem;