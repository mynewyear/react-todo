import React from 'react';
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoListItem = ({ todo, onRemoveTodo, todoCompletion }) => {
    if (!todo) {
        return <li className={style.ListItemError}>Error: Todo item is missing or incomplete.</li>;
    }
    const {title, id, completed} = todo;

    return (
        <li className={completed ? style.ListItemCompleted : style.ListItemNotCompleted}>
            <input
                className={style.checkbox}
                type="checkbox"
                checked={todo.completed}
                onChange={() => todoCompletion(todo.id)}
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
    todoCompletion: PropTypes.func.isRequired 
  };

export default TodoListItem;
