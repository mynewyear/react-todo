import React, {useState} from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState('');

    function handleTitleChange(e) {
        setTodoTitle(e.target.value);
    }

    function handleAddTodo(e) {
        e.preventDefault();
        if (todoTitle.trim() !== '') {
            onAddTodo(todoTitle);
            setTodoTitle("");
        }
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
                {/* Label content goes here */}
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;

