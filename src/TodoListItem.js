import React from 'react';
import style from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo, todoCompletion }) => {
    if (!todo) {
        return <li className={style.ListItemError}>Error: Todo item is missing or incomplete.</li>;
    }
    const {title, id, completed} = todo;

    return (
        <li className={{textDecoration: completed ? style.ListItemCompleted : style.ListItemNotCompleted}}>
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

export default TodoListItem;
