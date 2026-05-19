import React from "react";
import styles from "./Button.module.css";
const isPrimary = true;
function Button({ onClick, children, isDisabled, isActive }) {
  return (
    // <button className={isPrimary ? styles.primary : styles.btn}>кнопка</button>
    <button
      className={`${styles.btn} ${isActive ? styles.active : ""}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
