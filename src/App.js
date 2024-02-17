import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import TodoContainer from "./components/TodoContainer";
import LandingPage from "./components/LandingPage";
import PropTypes from 'prop-types';
import Footer from "./components/Footer";

const TableChooser = () => {
    const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
    return (
        <div >
            <select
                id="selectField"
                value={tableName}
                onChange={(event) => setTableName(event.target.value)}
            >
                <option value={process.env.REACT_APP_TABLE_NAME}>Todo List</option>
                <option value={process.env.REACT_APP_TABLE_NAME_2}>Todo List 2</option>
            </select>
            <TodoContainer tableName={tableName}/>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
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
            <Footer />
        </BrowserRouter>
    );
}

TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
};
export default App;