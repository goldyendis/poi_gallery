import { useContext, useEffect, useState } from "react";
import { FeatureCountContext } from "../../context/FeatureCountContext";
import { ClusterToggleContext } from "../../context/ClusterToogleContext";
import styles from "./ShowAllPoiMap.module.css";
import { LeafletMapContext } from "../../context/LeafletMapViewContext";

function ShowAllPoiMap() {
  const { isCluster, onChange } = useContext(ClusterToggleContext);
  const { count } = useContext(FeatureCountContext);
  const { view } = useContext(LeafletMapContext);
  const [poiIndividually, setPoiIndividually] = useState(false);

  useEffect(() => {
    if (view) {
      const checkZoom = () => {
        const zoom = view.getZoom();
        setPoiIndividually(zoom > 11);
        if (zoom <= 11) {
          onChange!(true);
        }
      };
      checkZoom();
      view.on("zoomend", checkZoom);
      return () => {
        view.off("zoomend", checkZoom);
      };
    }
  }, [view, poiIndividually]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(!event.target.checked);
      view?.closePopup();
    }
  };
  return (
    <div className={styles.clusterToggle}>
      <label htmlFor="legend-toggle">
        {poiIndividually ? (
          <div>
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={!isCluster}
              id="legend-toggle"
            />
            <span>
              Egyenként a(z) <b>{count}</b> POI
            </span>
          </div>
        ) : (
          <span>
            <b>{count}</b> POI
          </span>
        )}
      </label>
    </div>
  );
}

export default ShowAllPoiMap;
