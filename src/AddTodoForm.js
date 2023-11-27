import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

//originally you doing this directly in the input like this: 
//onChange((e)=>setTodoTitle(e.target.value)) which is 
//totally valid, but now that things are moving around it 
//probably makes more sense to define and pass this 
//handler into InputWithLabel instead of the state setter.
  function handleTitleChange(e) {
    setTodoTitle(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  }

  return (
    //in this block we're passing in as children in the InputWithLabel component
    <form onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>         
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

//export default AddTodoForm;