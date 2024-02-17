import React from "react";
import styles from "./Footer.module.css";

function Footer() {
    const today = new Date();

    const thisYear = today.getFullYear();

    return (
        <footer className={styles.footer}>
            <p>TODOAPP &copy;{thisYear}</p>
        </footer>
    );
}
export default Footer;