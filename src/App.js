import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import TodoContainer from "./components/TodoContainer";
import {TodoCounterProvider} from './components/TodoCounterContext';
import LandingPage from "./LandingPage";
import PropTypes from 'prop-types';


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
                <option value="List2">Todo List 2</option>
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

TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
};
export default App;