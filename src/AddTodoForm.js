import React from "react";

const AddTodoForm = () => {
    return (
        <div>
            <form>
                <label htmlFor="todoTitle">Title:</label>
                <br />
                <input type="text" id="todoTitle" required />
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTodoForm;