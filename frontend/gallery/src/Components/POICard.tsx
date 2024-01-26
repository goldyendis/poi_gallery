import { POI } from "../Types/PoiTypes";
import { Link } from "react-router-dom";
import styles from "./POICard.module.css";

type POICardProps = {
  poi: POI;
};

function POICard({ poi }: POICardProps) {
  return (
    <div className={styles.column}>
      <Link
        to={`/poigallery/poi/${poi.objectid}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        <div className={styles.smallCard}>
          <img
            className={styles.cardImage}
            src={poi.thumbnail}
            alt=""
            loading="lazy"
          />
          <div className={styles.cardText}>
            <h4>{poi.poicat_alias}</h4>
            <h6>{poi.poitype_alias}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default POICard;
