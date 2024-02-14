import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";


function TodoList({ todoList, onRemoveTodo, onToggleCompletion, onUpdateNewTitle }) {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onRemoveTodo={onRemoveTodo}
                    onToggleCompletion={onToggleCompletion} // Use this prop consistently
                    onUpdateNewTitle={onUpdateNewTitle}
                />
            ))}
        </ul>
    );
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleCompletion: PropTypes.func.isRequired, // Ensure this matches the prop passed to TodoListItem
    onReorderTodo: PropTypes.func,
};

export default TodoList;