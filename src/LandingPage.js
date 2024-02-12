import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <>
            <main>
                <div>
                    <h1>Todo App</h1>
                </div>
                <div>
                    <Link to="/TodoList">
                        View Todo List
                    </Link>
                    <Link to="/NewTodoList">
                        Create New Todo List
                    </Link>
                </div>
            </main>
            <footer className={styles.footer}>
                <p>© 2024 Your Todo App. All rights reserved.</p>
            </footer>
        </>
    );
};

export default LandingPage;