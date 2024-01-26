import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { vectorTileLayer } from "esri-leaflet-vector";
import "../Leaflet/myleaflet.css";

export function init(container: HTMLDivElement): L.Map | null {
  if (!container) return null;
  if ((container as any)._leafletMap) {
    return (container as any)._leafletMap;
  }
  const map = L.map(container)
    .setView([47, 19.5], 8)
    .setMaxZoom(18)
    .setMinZoom(7);
  vectorTileLayer("06a915134cfc46508938c110d2a8e8ef", {
    portalUrl: "https://turistaterkepek.hu/portal/",
  }).addTo(map);
  (container as any)._leafletMap = map;
  return map;
}
