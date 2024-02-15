import React, {useState} from 'react';
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoListItem = ({todo, onRemoveTodo, onToggleCompletion, onUpdateNewTitle}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    return (
        <li className={todo.completed ? style.ListItemCompleted : style.ListItemNotCompleted}>
            {isEditing ? (
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} // Handle change
                    className={style.editInput}
                />
            ) : (
                <>
                    <input
                        className={style.checkbox}
                        type="checkbox"
                        checked={todo.completed || false}
                        onChange={() => onToggleCompletion(todo.id, !todo.completed)} // toggle
                    />
                    <span className={style.itemText}>{todo.title}</span>
                </>
            )}
            {isEditing ? (
                <button
                    className={style.button}
                    onClick={() => {
                        onUpdateNewTitle(todo.id, editTitle); // Save changes
                        setIsEditing(false); // Exit editing mode
                    }}
                >
                    Save
                </button>
            ) : (
                <>
                    <button
                        className={style.button}
                        onClick={() => setIsEditing(true)} // Enter editing mode inline
                    >
                        Edit
                    </button>
                    <button
                        className={style.button}
                        onClick={() => onRemoveTodo(todo.id)}
                    >
                        Remove
                    </button>
                </>
            )}
        </li>
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleCompletion: PropTypes.func.isRequired,
    onUpdateNewTitle: PropTypes.func.isRequired,
};

export default TodoListItem;
