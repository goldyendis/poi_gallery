import { useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import { POI } from "../Types/PoiTypes";
import Point from "@arcgis/core/geometry/Point.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import { renderToString } from "react-dom/server";
import "./poidetails.css";
import Pin from "./Icons/Pin";

function POIMap({ coordinates }: POI) {
  const pinSvg = renderToString(<Pin />);
  const pinSymbol = new PictureMarkerSymbol({
    url: `data:image/svg+xml;base64,${btoa(pinSvg)}`,
    width: 30,
    height: 35,
  });
  const graphicLayer = new GraphicsLayer();
  const centerPoint = new Point({
    x: coordinates.x,
    y: coordinates.y,
    spatialReference: SpatialReference.WebMercator,
  });
  useEffect(() => {
    const map = new Map();
    const view = new MapView({
      container: "viewDivPoi",
      center: centerPoint,
      zoom: 13,
      map: map,
    });

    const pinGraphich = new Graphic({
      geometry: centerPoint,
      symbol: pinSymbol,
    });
    const vectorTileLayer = new VectorTileLayer({
      style:
        "https://turistaterkepek.hu/portal/sharing/rest/content/items/8886b0940476436591b0bbe4f01d7185/resources/styles/root.json",
    });
    vectorTileLayer.load().then(() => {
      map.add(vectorTileLayer);
      graphicLayer.add(pinGraphich);
      map.add(graphicLayer);
    });
  });

  return <div id="viewDivPoi" className="map-POI"></div>;
}

export default POIMap;
