import React, { useState } from 'react';
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoListItem = ({ todo, onRemoveTodo, onToggleCompletion, onUpdateNewTitle }) => { // Use onToggleCompletion here
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onUpdateNewTitle(todo.id, editTitle); // Call the function to update the title in the parent state
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditTitle(e.target.value);
    };

    return (
        <li className={todo.completed ? style.ListItemCompleted : style.ListItemNotCompleted}>
            {isEditing ? (
                <input
                    type="text"
                    value={editTitle}
                    onChange={handleChange}
                    className={style.editInput}
                />
            ) : (
                <>
                    <input
                        className={style.checkbox}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggleCompletion(todo.id)}
                    />
                    <span className={style.itemText}>{todo.title}</span>
                </>
            )}
            {isEditing ? (
                <button className={style.button} onClick={handleSave}>Save</button>
            ) : (
                <>
                    <button className={style.button} onClick={handleEdit}>Edit</button>
                    <button className={style.button} onClick={() => onRemoveTodo(todo.id)}>Remove</button>
                </>
            )}
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
    onToggleCompletion: PropTypes.func.isRequired,
    onUpdateNewTitle: PropTypes.func.isRequired,
};

export default TodoListItem;
