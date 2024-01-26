import { Link, useLocation } from "react-router-dom";
import { ChangeViewProps } from "./ChangeViewToMap";
import FillGridFill from "../Icons/FillGridFill";
import IconGrid from "../Icons/IconGrid";
import styles from "./ChangeView.module.css";

function ChangeViewToGallery({ active, onClick }: ChangeViewProps) {
  const location = useLocation();

  return (
    <Link to={`/poigallery/${location.search}`}>
      <button
        className={active ? styles.btnViewChangeActive : styles.btnViewChange}
        id="galleryView"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {active ? (
          <>
            <FillGridFill />
            <span>Galéria</span>
          </>
        ) : (
          <IconGrid />
        )}
      </button>
    </Link>
  );
}

export default ChangeViewToGallery;
