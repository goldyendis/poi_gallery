import styles from "./FilterSpinner.module.css";

export default function FilterSpinner() {
  return (
    <div className={styles.spinnerFilterContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
