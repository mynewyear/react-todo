import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";

const InputWithLabel = ({children, todoTitle, handleTitleChange}) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor="inputField">{children}</label>
            <br/>
            <input
                type="text"
                id="inputField"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
                required
                ref={inputRef}
            />
        </>
    );
}

// propTypes 
InputWithLabel.propTypes = {
    children: PropTypes.node, // `children` can be anything that can be rendered: numbers, strings, elements, array.
    todoTitle: PropTypes.string, // `todoTitle` must be a string.
    handleTitleChange: PropTypes.func.isRequired, 
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default InputWithLabel;