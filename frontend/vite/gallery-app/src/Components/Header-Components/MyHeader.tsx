import mtszImage from "../mtsz.png";
import styles from "./MyHeader.module.css";
import { lazy } from "react";

const Search = lazy(() => import("./Search"));
const LowerHeader = lazy(() => import("./LowerHeader"));

function MyHeader() {
  return (
    <header className={styles.myHeader}>
      <div className={styles.upperHeader}>
        <div className={styles.leftContent}>
          <a
            className={styles.logoLink}
            href="https://turistaterkepek.hu/poigallery/"
          >
            <img className={styles.logoImg} alt="" src={mtszImage} />
          </a>
          <span>MTSZ POI Galéria</span>
        </div>
        <Search />
      </div>
      <LowerHeader />
    </header>
  );
}

export default MyHeader;
