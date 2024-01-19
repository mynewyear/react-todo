import React, {useState} from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";


const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState('');

    function handleTitleChange(e) {
        setTodoTitle(e.target.value);
    }

    function handleAddTodo(e) {
        e.preventDefault();
    if (todoTitle.trim().length) { //your check is fine, just showing you another way to checking the same thing here
      onAddTodo(todoTitle);
      setTodoTitle("");
    } else {
      alert("Title is required");
    }

    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
                {/* Label content goes here */}
            </InputWithLabel>
            <button className={style.button} type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;

