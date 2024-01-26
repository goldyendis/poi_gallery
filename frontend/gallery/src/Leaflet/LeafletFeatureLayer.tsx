import { useContext, useEffect, useRef, useState } from "react";
import { LeafletMapContext } from "../context/LeafletMapViewContext";
import { useSearchParams } from "react-router-dom";
import { ClusterToggleContext } from "../context/ClusterToogleContext";
import { FeatureCountContext } from "../context/FeatureCountContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMapData } from "../utils/urls_development";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { getMarkerIcon } from "./marker_icons";
import { getMapFeatures } from "./leafletlayerfeatures";
import { markerSpiderfy } from "./leafletlayer_utils";
import { mapPOIData } from "../Types/PoiTypes";
import { CanvasLayer } from "./LeafletCanvas";

function LeafletFeatureLayer() {
  const { view } = useContext(LeafletMapContext);
  const { isCluster } = useContext(ClusterToggleContext);
  const [searchParams] = useSearchParams();
  const [prevSearchParams] = useState<URLSearchParams>();
  const { onChangeCount } = useContext(FeatureCountContext);
  const [currentLayer, setCurrentLayer] = useState<L.Layer | null>(null);
  const activeClusterMarkersRef = useRef([]);
  const { data } = useQuery({
    queryKey: [`map`],
    queryFn: () => {
      return fetchMapData();
    },
    staleTime: Infinity,
    networkMode: "offlineFirst",
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!data || !view) return;
    if (currentLayer) {
      view.removeLayer(currentLayer);
    }
    let filteredData: mapPOIData[];
    getMapFeatures(searchParams, data, prevSearchParams)
      .then((data) => (filteredData = data))
      .then(async () => {
        if (!isCluster) {
          const newLayer = new CanvasLayer(filteredData, view);
          newLayer.addTo(view);
          setCurrentLayer(newLayer);
          if (onChangeCount) {
            onChangeCount(newLayer.getCount());
          }
        } else {
          const newLayer = L.markerClusterGroup({
            zoomToBoundsOnClick: false,
            showCoverageOnHover: false,
            spiderfyShapePositions: markerSpiderfy,
            disableClusteringAtZoom: 19,
            maxClusterRadius: 90,
          });

          filteredData.forEach((point) => {
            const marker = L.marker(
              [point.coordinates[0], point.coordinates[1]],
              { icon: getMarkerIcon(point.poitype) }
            );
            marker.on("click", async () => {
              const { createPopUp } = await import("./leafletlayer_utils");
              const popupContainer = await createPopUp({
                view: view,
                marker: marker,
                layer: newLayer,
                point: point,
                clusterMarkers: activeClusterMarkersRef,
              });

              marker.bindPopup(popupContainer).openPopup();
            });
            newLayer.addLayer(marker);
            setCurrentLayer(newLayer);
          });

          if (onChangeCount) {
            onChangeCount(newLayer.getLayers().length);
          }
          view.addLayer(newLayer);
        }
      });
    return () => {
      if (view && currentLayer) {
        currentLayer.clearAllEventListeners();
        view.removeLayer(currentLayer);
      }
    };
  }, [data, view, onChangeCount, isCluster, searchParams]);
  useEffect(() => {
    if (!currentLayer || !view) return;
    clusterInit(currentLayer, view, activeClusterMarkersRef);

    return () => {
      if (currentLayer) {
        currentLayer.clearAllEventListeners();
      }
    };
  }, [currentLayer]);

  const clusterInit = (
    layer: L.Layer,
    view: L.Map,
    activeClusterMarkersRef: any
  ) => {
    layer.on("clustermouseover", (clusterEvent: L.LeafletEvent) => {
      const cluster = clusterEvent.propagatedFrom;
      const count = cluster.getChildCount();

      if (count < 10 || view.getZoom() === view.getMaxZoom()) {
        cluster.spiderfy();
        activeClusterMarkersRef.current = cluster.getAllChildMarkers();
      }
    });
    layer.on("animationend", () => {
      view.panBy([0, 0]);
    });
    layer.on("clusterclick", (clusterEvent: L.LeafletEvent) => {
      const count = clusterEvent.propagatedFrom.getChildCount();
      if (count > 9) {
        clusterEvent.propagatedFrom.zoomToBounds();
      }
    });
  };

  return <></>;
}

export default LeafletFeatureLayer;
