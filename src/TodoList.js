import React from "react";

const todoList = [
    {
        id: 1,
        title: "Wake up",
    },
    {
        id: 2,
        title: "Take a shower",
    },
    {
        id: 3,
        title: "Take a coffee",
    },
    {
        id: 4,
        title: "Learn React",
    },
];

const TodoList = () => {
    return (
        <>
            <ul>
                {todoList.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </>
    );
};

export default TodoList;