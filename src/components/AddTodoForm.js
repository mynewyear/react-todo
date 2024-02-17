import React, {useState} from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";


const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState('');

    function handleTitleChange(e) {
        setTodoTitle(e.target.value);
    }

    function handleAddTodo(e) {
        e.preventDefault();
    if (todoTitle.trim().length) {
      onAddTodo(todoTitle);
      setTodoTitle("");
    } else {
      alert("Title is required");
    }

    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel className={style.inputField} todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
                {/* Label content goes here */}
            </InputWithLabel>
            <button className={style.button} type="submit">Add</button>
        </form>
    );
};

// propTypes 
AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;

