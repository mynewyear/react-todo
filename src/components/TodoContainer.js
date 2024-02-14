import {useState, useEffect, useContext, useCallback} from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import {TodoCounterContext} from './TodoCounterContext';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";



const TodoContainer = ({tableName}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Default should be false
    const {count, setCount} = useContext(TodoCounterContext);
    const [sortField, setSortField] = useState("title");

    // Dynamic URL based on tableName
    const getDynamicUrl = useCallback(() => `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}?view=${encodeURIComponent('Grid view')}`, [tableName]);

    // Optimize the sorting function to be a part of state updates rather than a separate call
    const sortTodos = useCallback((todos) => {
        return todos.sort((a, b) => {
            switch (sortField) {
                case "title":
                    return a.title.localeCompare(b.title);
                case "old to new":
                    return new Date(a.createDateTime) - new Date(b.createDateTime);
                case "new to old":
                    return new Date(b.createDateTime) - new Date(a.createDateTime);
                default:
                    return 0;
            }
        });
    }, [sortField]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const dynamicUrl = getDynamicUrl();
        try {
            const response = await fetch(dynamicUrl, {
                headers: { 'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` },
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setTodoList(sortTodos(data.records.map(record => ({
                ...record.fields,
                id: record.id,
            }))));
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [getDynamicUrl, sortTodos]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setCount(todoList.length);
    }, [todoList, setCount]);

    const addTodo = async (title) => {
        const dynamicUrl = getDynamicUrl(); // Use dynamic URL for POST request
        const newTodo = {
            fields: {
                title: title,
            },
        };

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        };

        try {
            const response = await fetch(dynamicUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTodoList([...todoList, {
                title: data.fields.Title,
                id: data.id,
                completed: data.fields.completed || false,
            }]);

        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id, newValues) => {
        const updateUrl = `${getDynamicUrl()}/${id}`;
        const options = {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({fields: newValues}),
        };

        try {
            const response = await fetch(updateUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchData(); // Refetch todos list to reflect changes
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        //  URL for deletion
        const deleteUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`;
        try {
            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            //console.log("Delete successful"); //check
            fetchData(); // Refresh the todo list after deletion
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const removeTodo = (id) => {
        deleteTodo(id).then(() => {
            const updatedList = todoList.filter(todo => todo.id !== id);
            setTodoList(updatedList);
        });
    };

    const toggleTodoCompletion = async (id) => {
        // Optimistically update the UI
        const updatedTodoList = todoList.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        const sortedTodoList = updatedTodoList.sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
        )
        setTodoList(sortedTodoList);

        // Find the item that was updated
        const todoToUpdate = sortedTodoList.find(todo => todo.id === id);

        // try to update the backend
        try {
            await updateTodo(id, {completed: todoToUpdate.completed});
        } catch (error) {
            console.error('Failed to update todo completion status:', error);
        }
    };

    const reorderTodo = (newTodoList) => {
        setTodoList(newTodoList);
    };

    const updateNewTitle = async (id, newTitle) => {
        const updateUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`;

        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    title: newTitle // Make sure "title" matches the field name in your Airtable base
                }
            })
        };

        try {
            const response = await fetch(updateUrl, options);
            if (!response.ok) {
                // If the HTTP request returns a non-ok response, throw an error
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Update successful', data);

            // Optional: Refresh the todo list from the API to reflect the update
            fetchData();
        } catch (error) {
            console.error('Error updating todo title:', error);
        }
    };

    return (
        <section style={{position: "relative"}}>
            <button>
                <Link to="/" style={{color: "black", textDecoration: "none"}}>
                    Back
                </Link>
            </button>
            <select
                className="right-select"
                onChange={(e) => {
                    setSortField(e.target.value);
                    sortTodos(todoList, e.target.value);
                }}
            >
                <option value="new to old">new to old</option>
                <option value="old to new">old to new</option>
                <option value="title">title</option>
            </select>
            <h1 style={{textAlign: "center"}}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            {isLoading && <p>Loading...</p>}
            <>
                <span style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 100,
                    fontVariant: "small-caps",
                }}>
                    Item Counts: {count}
                </span>
                <TodoList
                    todoList={todoList}
                    onRemoveTodo={removeTodo}
                    onToggleCompletion={toggleTodoCompletion}
                    onReorderTodo={reorderTodo}
                    onUpdateNewTitle={updateNewTitle}
                />
            </>
        </section>
    );
};


TodoList.propTypes = {
    // Expecting todoList to be an array of objects
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            // Include other properties expected in a todo item here
        })
    ).isRequired,
    // Functions
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleCompletion: PropTypes.func.isRequired,
    onReorderTodo: PropTypes.func,
    onUpdateNewTitle: PropTypes.func.isRequired,
};

export default TodoContainer;