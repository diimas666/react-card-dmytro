import styles from "./SearchInput.module.css";
import { useId } from "react";
import { SearchIcon } from "../icons";
export const SearchInput = ({ value, onChange }) => {
  const inputId = useId();
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={inputId}>
        {/* icon  */}
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={onChange}
          id={inputId}
          className={styles.input}
        />
      </label>
    </div>
  );
};
