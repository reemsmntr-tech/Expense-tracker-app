import styles from "../home.module.css";

export default function HomeSkeleton() {
  return (
    <div className={styles["dashboard-layout"]}>
      <div className={styles["dashboard-body"]}>
        <div className={`${styles["skeleton"]} ${styles["skeleton-medium"]}`} />
        <div className={`${styles["skeleton"]} ${styles["skeleton-large"]}`} />
        <div className={`${styles["skeleton"]} ${styles["skeleton-thin"]}`} />
        <div className={`${styles["skeleton"]} ${styles["skeleton-thin"]}`} />
      </div>
    </div>
  );
}