import { POI } from "../Types/PoiTypes";
import styles from "./POIPage.module.css";

export default function POIDetailsList(poi: POI) {
  return (
    <div
      style={{
        width: "33%",
        height: "30%",
        position: "absolute",
        bottom: "0",
        right: "0",
        margin: "10px",
        backgroundColor: "lightgray",
        padding: "5px",
        overflowWrap: "break-word",
        display: "inline-flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignContent: "center",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: "10",
      }}
    >
      <h5 className={styles.myh5}>Megjegyzés</h5>
      <h6 className={styles.myh6}>{poi.notes}</h6>
      <h5 className={styles.myh5}>POI Kategória</h5>
      <h6 className={styles.myh6}>{poi.poicat_alias}</h6>
      <h5 className={styles.myh5}>POI Típus</h5>
      <h6 className={styles.myh6}>{poi.poitype_alias}</h6>
      <h5 className={styles.myh5}>POI Neve</h5>
      <h6 className={styles.myh6}>{poi.poiname}</h6>
      <h5 className={styles.myh5}>Felmérés ideje</h5>
      <h6 className={styles.myh6}>{poi.surveydate}</h6>
      <h5 className={styles.myh5}>Koordináták</h5>
      <h6 className={styles.myh6}>{poi.coordinates.x}</h6>
      <h6 className={styles.myh6}>{poi.coordinates.y}</h6>
    </div>
  );
}
