import { lazy, useContext, useEffect, useRef } from "react";
import { LeafletMapContext } from "../context/LeafletMapViewContext";
type LeafletMapProps = {
  active: boolean;
};
const LeafletFeatureLayer = lazy(() => import("./LeafletFeatureLayer"));
export default function LeafletMap({ active }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(LeafletMapContext);
  useEffect(() => {
    if (mapRef.current && loadMap) {
      loadMap(mapRef.current);
    }
  }, [loadMap]);
  const calculatedHeight = `calc(100vh - 95px)`;
  return (
    <div
      ref={mapRef}
      style={{
        position: "fixed",
        top: active ? "95px" : "0px",
        width: active ? "100%" : "0px",
        height: active ? calculatedHeight : "0px",
        visibility: active ? "visible" : "hidden",
        backgroundColor: "white",
        zIndex: "-1",
      }}
    >
      <LeafletFeatureLayer />
    </div>
  );
}
