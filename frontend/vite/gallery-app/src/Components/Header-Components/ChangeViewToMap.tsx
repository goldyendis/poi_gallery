import { Link, useLocation } from "react-router-dom";
import FillMapFill from "../Icons/FillMapFill";
import Map from "../Icons/Map";
import styles from "./ChangeView.module.css";
import "./view_toogle.css";

export type ChangeViewProps = {
  active: boolean;
  onClick: () => void;
};

function ChangeViewToMap({ active, onClick }: ChangeViewProps) {
  const location = useLocation();
  return (
    <Link to={`/poigallery/map/${location.search}`}>
      <button
        className={active ? styles.btnViewChangeActive : styles.btnViewChange}
        onClick={onClick}
        style={{ cursor: "pointer" }}
        id="mapView"
      >
        {active ? (
          <>
            <FillMapFill />
            <span>Térkép</span>
          </>
        ) : (
          <Map />
        )}
      </button>
    </Link>
  );
}

export default ChangeViewToMap;
