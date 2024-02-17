import {useCallback, useContext, useEffect, useState} from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import {TodoCounterContext} from './TodoCounterContext';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`;

const TodoContainer = ({tableName}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Default should be false
    const {count, setCount} = useContext(TodoCounterContext);
    const [sortField, setSortField] = useState("title");

    // Dynamic URL based on tableName
    const getDynamicUrl = useCallback(() => `${baseUrl}${tableName}?view=${encodeURIComponent('Grid view')}`, [tableName]);

    // sorting function
    const sortTodos = useCallback((todos) => {
        const sortedTodos = [...todos].sort((a, b) => {
            switch (sortField) {
                case "A to Z":
                    return a.title.localeCompare(b.title);
                case "Z to A":
                    return b.title.localeCompare(a.title);
                //TODO: sorting by data in development
                case "old to new":
                    // Ensure dates are compared correctly
                    return new Date(a.createDateTime) - new Date(b.createDateTime);
                case "new to old":
                    return new Date(b.createDateTime) - new Date(a.createDateTime);
                default:
                    return a.title.localeCompare(b.title);
            }
        });
        return sortedTodos;
    }, [sortField]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const dynamicUrl = getDynamicUrl();
        try {
            const response = await fetch(dynamicUrl, {
                headers: {'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`},
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            const todosWithDate = data.records.map(record => ({
                ...record.fields,
                id: record.id,
                createDateTime: record.fields.createDateTime,
            }));
            setTodoList(sortTodos(todosWithDate));
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
        const dynamicUrl = getDynamicUrl();
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
                title: data.fields.title,
                id: data.id,
                completed: data.fields.completed || false,
            }]);

        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id, completed) => {
        const updateUrl = `${baseUrl}${tableName}/${id}`;
        const fieldsToUpdate = {
            "completed": completed
        };

        const options = {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fields: fieldsToUpdate}),
        };

        try {
            const response = await fetch(updateUrl, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.log("Todo updated successfully", await response.json());
            //fetchData(); // re-fetch data
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        //  URL for deletion
        const deleteUrl = `${baseUrl}${tableName}/${id}`;

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
            setTodoList((currentTodos) => currentTodos.filter(todo => todo.id !== id));
            //console.log("Delete successful"); //check
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw new Error('Deletion failed');
        }
    };

    const removeTodo = (id) => {
        deleteTodo(id).catch((error) => {
            console.error('Failed to delete todo:', error);
        });
    };

    const toggleTodoCompletion = async (id) => {
        // Find the item to update
        const todoIndex = todoList.findIndex(todo => todo.id === id);
        if (todoIndex === -1) return;

        // Optimistically update the UI
        const newTodoList = [...todoList];
        newTodoList[todoIndex] = {
            ...newTodoList[todoIndex],
            completed: !newTodoList[todoIndex].completed
        };
        setTodoList(newTodoList);

        // Update the backend
        try {
            await updateTodo(id, newTodoList[todoIndex].completed);
            fetchData();
        } catch (error) {
            console.error('Failed to update todo completion status:', error);
        }
    };

    const reorderTodo = (newTodoList) => {
        setTodoList(newTodoList);
    };

    const updateNewTitle = async (id, newTitle) => {
        const updateUrl = `${baseUrl}${tableName}/${id}`;
        const fieldsToUpdate = {
            "title": newTitle
        };

        const options = {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fields: fieldsToUpdate}),
        };

        try {
            const response = await fetch(updateUrl, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Update successful', data);
            fetchData(); // re-fetch data
        } catch (error) {
            console.error('Error updating todo:', error);
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
                <option value="A to Z">A to Z</option>
                <option value="Z to A">Z to A</option>
                <option value="new to old">new to old</option>
                <option value="old to new">old to new</option>
            </select>
            <h1 style={{color: "white", textAlign: "center"}}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            {isLoading && <p>Loading...</p>}
            <>
                <span style={{
                    fontFamily: "Yellow-tail",
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
            completed: PropTypes.bool,
        })
    ).isRequired,
    // Functions
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleCompletion: PropTypes.func.isRequired,
    onReorderTodo: PropTypes.func,
    onUpdateNewTitle: PropTypes.func.isRequired,
};

export default TodoContainer;