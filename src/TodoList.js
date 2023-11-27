import React from "react";
import TodoListItem from "./TodoListItem";
  
function TodoList({ todoList , onRemoveTodo}) {
  return (
    <>
      <ul>
        {todoList.map((todo) => (
          //<TodoListItem key={todo.id} todo={todo} />
          <TodoListItem
              key={todo.id}
              todo={todo.title}
              id={todo.id}
              onRemoveTodo={onRemoveTodo}
            />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
