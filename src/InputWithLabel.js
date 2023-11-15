import React, { useEffect, useRef } from "react";

function InputWithLabel ({id, value, inputChange, children}) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor={id}>Title:{children}</label>
                <br />
                <input
                type="text"
                id={id}
                name={id}
                required
                value={value}
                onChange={inputChange}
                ref = {inputRef}
            />
        </>
    );
}
export default InputWithLabel;