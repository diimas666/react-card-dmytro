import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>React Card </span>
      </p>
      <div className={styles.headerButtons}>
        <Button onClick={() => navigate("/addquestion")}>Add</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </header>
  );
}

export default Header;
