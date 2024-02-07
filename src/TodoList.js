import React from "react";
import TodoListItem from "./TodoListItem";


function TodoList({ todoList, onRemoveTodo, toggleTodoCompletion, onReorderTodo }) {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onRemoveTodo={onRemoveTodo}
                    todoCompletion={toggleTodoCompletion}
                />
            ))}
        </ul>
    );
}

export default TodoList;

