import React from 'react';
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoListItem = ({ todo, onRemoveTodo, onToggleCompletion }) => { // Use onToggleCompletion here
    if (!todo) {
        return <li className={style.ListItemError}>Error: Todo item is missing or incomplete.</li>;
    }
    const {title, id, completed} = todo;

    return (
        <li className={completed ? style.ListItemCompleted : style.ListItemNotCompleted}>
            <input
                className={style.checkbox}
                type="checkbox"
                checked={completed} // Directly use completed from destructuring
                onChange={() => onToggleCompletion(id)} // Use onToggleCompletion here
            />
            <span className={style.itemText}>{title}</span>
            <button className={style.button} type="button" onClick={() => onRemoveTodo(id)}>Remove</button>
        </li>
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleCompletion: PropTypes.func.isRequired, // Ensure this matches what's passed in
};

export default TodoListItem;
