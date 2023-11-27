import React, { useEffect, useRef } from "react";

const InputWithLabel = ({ children, todoTitle, handleTitleChange }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor="inputField">{children}</label>
                <br />
                <input
                type="text"
                id="inputField"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
                required
                ref = {inputRef}
            />
        </>
    );
}
export default InputWithLabel;