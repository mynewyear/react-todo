import React, {useState} from "react";
//import TodoList from "./components/TodoList";
//import AddTodoForm from "./components/AddTodoForm";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
//import  styled from "./App.module.css";
import TodoContainer from "./components/TodoContainer";
import {TodoCounterProvider} from './components/TodoCounterContext'; // Adjust the import path as necessary
import LandingPage from "./LandingPage";


//const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

const TableChooser = () => {
    const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
    return (
        <div>
            <select
                id="selectField"
                value={tableName}
                onChange={(event) => setTableName(event.target.value)}
            >
                <option value={process.env.REACT_APP_TABLE_NAME}>Todo List</option>
                <option value="List2">List 2</option>
            </select>
            <TodoContainer tableName={tableName}/>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <TodoCounterProvider>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/TodoList" element={<TableChooser/>}/>
                    <Route path="/newTodoList" element={
                        <>
                            <button>
                                <Link to="/" style={{color: "black", textDecoration: "none"}}>
                                    Back
                                </Link>
                            </button>
                            <h1>New Todo List</h1>
                        </>
                    }
                    />
                </Routes>
            </TodoCounterProvider>
        </BrowserRouter>
    );
}

export default App;