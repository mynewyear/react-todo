import React, {useEffect, useState} from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from Airtable API
    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            },
        };

        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            // Mapping data
            const todos = data.records.map(record => ({
                title: record.fields.title,
                id: record.id,
                completed: record.fields.completed || false,
            }));

            setTodoList(todos); // Set todoList

        } catch (error) {
            console.error('Fetch error:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [todoList]);

    const addTodo = async (title) => {
        const newTodo = {
            fields: {
                title: title, // Airtable field name
            }
        };

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        };

        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

        try {
            const response = await fetch(url, options);
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

    const reorderTodo = (newTodoList) => {
        setTodoList(newTodoList);
    };

    return (
        <>
            <h1>ToDo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            {
                isLoading ? (
                    <p>Loading ...</p>
                ) : (
                    <TodoList
                        todoList={todoList}
                        onRemoveTodo={removeTodo}
                        toggleTodoCompletion={toggleTodoCompletion}
                        onReorderTodo={reorderTodo}/>
                )
            }
        </>
    );
}

export default App;
