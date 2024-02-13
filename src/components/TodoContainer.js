import {useState, useEffect, useContext, useCallback} from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import {TodoCounterContext} from './TodoCounterContext';
import {Link} from "react-router-dom";

const TodoContainer = ({tableName}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {count, setCount} = useContext(TodoCounterContext);

    // Dynamic URL construction based on tableName
    const getDynamicUrl = useCallback(() => `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`, [tableName]);

    const fetchData = useCallback(async () => {
        const dynamicUrl = getDynamicUrl();
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            },
        };

        try {
            const response = await fetch(dynamicUrl, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            const todos = data.records.map(record => ({
                title: record.fields.title,
                id: record.id,
                completed: record.fields.completed || false,
            }));

            setTodoList(todos);
        } catch (error) {
            console.error('Fetch error:', error.message);
        } finally {
            setIsLoading(false);
        }
    }, [getDynamicUrl]); // includes getDynamicUrl as a dependency

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

    const removeTodo = (id) => {
        const updatedList = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedList);
    };

    const toggleTodoCompletion = (id) => {
        const updatedTodoList = todoList.map((todo) =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );

        const sortedTodoList = updatedTodoList.sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
        );

        setTodoList(sortedTodoList);
    };

    const updateNewTitle = (id, newTitle) => {
        const updatedTodoList = todoList.map((todo) =>
            todo.id === id ? {...todo, title: newTitle} : todo
        );

        setTodoList(updatedTodoList);
        updateTodo(updatedTodoList.find((itemTodo) => itemTodo.id === id));
    };

    const reorderTodo = (newTodoList) => {
        setTodoList(newTodoList);
    };

    return (
        <section style={{position: "relative"}}>
            <button>
                <Link to="/" style={{color: "black", textDecoration: "none"}}>
                    Back
                </Link>
            </button>
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


export default TodoContainer;