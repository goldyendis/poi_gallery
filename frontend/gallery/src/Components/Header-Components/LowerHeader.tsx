import { useState, lazy, Suspense } from "react";
import { useLocation } from "react-router";
import styles from "./LowerHeader.module.css";

const ChangeViewToGallery = lazy(() => import("./ChangeViewToGallery"));
const ChangeViewToMap = lazy(() => import("./ChangeViewToMap"));
const FilterDropDown = lazy(() => import("./FilterDropDown"));

function LowerHeader() {
  const location = useLocation();
  const [activeView, setActiveView] = useState<"list" | "map" | null>();
  const ShowAllPoiMap = lazy(() => import("./ShowAllPoiMap"));

  if (!activeView) {
    const path: string[] = location.pathname.split("/");
    const mapView = path.includes("map");
    setActiveView(mapView ? "map" : "list");
  }

  const handleViewChange = (view: "list" | "map") => {
    setActiveView(view);
  };

  return (
    <div className={styles.lowerHeader}>
      <Suspense>
        <div className={styles.leftBtns}>
          <div
            className={styles.groupViewRadio}
            onChange={(e) => handleViewChange("list")}
          >
            <ChangeViewToGallery
              active={activeView === "list"}
              onClick={() => handleViewChange("list")}
            />
            <ChangeViewToMap
              active={activeView === "map"}
              onClick={() => handleViewChange("map")}
            />
          </div>
          <FilterDropDown />
        </div>
      </Suspense>
      {activeView === "map" && (
        <Suspense>
          <ShowAllPoiMap />
        </Suspense>
      )}
    </div>
  );
}

export default LowerHeader;
