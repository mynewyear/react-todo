import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";


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

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    toggleTodoCompletion: PropTypes.func.isRequired,
    onReorderTodo: PropTypes.func 
};

export default TodoList;

