import styles from "./Badge.module.css";
export const Badge = ({ children, variant }) => {
  switch (variant) {
    case "primary":
      return (
        <span className={`${styles.badge} ${styles.primary}`}>{children}</span>
      );
    case "success":
      return (
        <span className={`${styles.badge} ${styles.success}`}>{children}</span>
      );
    case "warning":
      return (
        <span className={`${styles.badge} ${styles.warning}`}>{children}</span>
      );
    case "alert":
      return (
        <span className={`${styles.badge} ${styles.alert}`}>{children}</span>
      );
    default:
      return <span className={styles.badge}>{children}</span>;
  }
};
