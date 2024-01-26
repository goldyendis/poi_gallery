import { useEffect, useRef, useContext } from "react";
import { LeafletMapContext } from "../context/LeafletMapViewContext";
import "./poidetails.css";
import L from "leaflet";

type POIMapProps = {
  lat: number;
  lon: number;
};

function POIMap({ lat, lon }: POIMapProps) {
  const { view, loadMap } = useContext(LeafletMapContext);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !view) {
      loadMap!(mapContainerRef.current);
    }
  }, [mapContainerRef, loadMap, view]);

  useEffect(() => {
    if (view && lat && lon) {
      view.setView(new L.LatLng(lat, lon), 13);
    }
  }, [view]);

  return <div id="viewDivPoi" className="map-POI" ref={mapContainerRef}></div>;
}

export default POIMap;
