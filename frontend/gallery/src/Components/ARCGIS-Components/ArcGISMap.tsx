import { lazy, useContext, useEffect, useRef } from "react";
import { MapContext } from "../../context/MapViewContext";
type ArcGISMapProps = {
  active: boolean;
};
const ArcGISFeatureLayer = lazy(() => import("./ArcGISFeatureLayer"));
export default function ArcGISMap({ active }: ArcGISMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(MapContext);

  useEffect(() => {
    if (mapRef.current && loadMap) {
      loadMap(mapRef.current);
    }
  }, [loadMap]);

  const calculatedHeight = `calc(100vh - 95px)`;

  return (
    <div
      className="viewDiv"
      ref={mapRef}
      style={{
        position: active ? "relative" : "inherit",
        top: active ? "95px" : "0px",
        width: active ? "100%" : "0px",
        height: active ? calculatedHeight : "0px",
        visibility: active ? "visible" : "hidden",
        backgroundColor: "white",
        zIndex: "0",
      }}
    >
      <ArcGISFeatureLayer />
    </div>
  );
}
