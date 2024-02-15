import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <>
            <main>
                <section className={styles.container}>
                <div className={styles.titleAndButtonsContainer} >
                    <h1>Todo App</h1>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to="/TodoList" className={styles.button}>
                        View Todo List
                    </Link>
                    <Link to="/NewTodoList" className={styles.button}>
                        Create New Todo List
                    </Link>
                </div>
                </section>
            </main>
            <footer className={styles.footer}>
                <p>© 2024 Your Todo App. All rights reserved.</p>
            </footer>
        </>
    );
};

export default LandingPage;