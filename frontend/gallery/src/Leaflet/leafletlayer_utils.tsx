import L from "leaflet";
import { mapPOIData, popUp } from "../Types/PoiTypes";
import { fetchPopUpData } from "../utils/urls_development";
import LeafletPopupContent from "./LeafletPopupContent";

export const markerSpiderfy = (count: number, centerPt: L.Point) => {
  var baseRadius = 44,
    radiusIncrement = 35,
    points: L.Point[] = [],
    baseCountPerCircle = 9,
    circleIndex = 0,
    totalPlacedMarkers = 0;

  while (totalPlacedMarkers < count) {
    var maxMarkersInCurrentCircle = Math.round(
      baseCountPerCircle * Math.pow(1.75, circleIndex)
    );
    var markersInCurrentCircle = Math.min(
      maxMarkersInCurrentCircle,
      count - totalPlacedMarkers
    );

    var isLastCircle = totalPlacedMarkers + markersInCurrentCircle >= count;
    var angleStep, startAngle;

    if (isLastCircle && count > 9) {
      angleStep = (2 * Math.PI) / maxMarkersInCurrentCircle;
      startAngle =
        -Math.PI / 2 - Math.floor(markersInCurrentCircle / 2) * angleStep;
    } else {
      angleStep = (2 * Math.PI) / markersInCurrentCircle;
      startAngle = 0;
    }

    for (var i = 0; i < markersInCurrentCircle; i++) {
      var angle = startAngle + angleStep * i;
      var radius = baseRadius + circleIndex * radiusIncrement;
      var x = centerPt.x + radius * Math.cos(angle);
      var y = centerPt.y + radius * Math.sin(angle);

      points.push(new L.Point(x, y + 15));
      totalPlacedMarkers++;
    }

    circleIndex++;
  }

  return points;
};

type PopUpProp = {
  view: L.Map;
  marker?: L.Marker;
  layer?: any;
  point: mapPOIData;
  clusterMarkers?: any;
};

export const createPopUp = async ({
  view,
  marker,
  layer,
  point,
  clusterMarkers,
}: PopUpProp) => {
  const popupContainer = document.createElement("div");
  view.getPane("popupPane")!.appendChild(popupContainer);
  let isInCluster: boolean = false;
  if (layer) {
    const markerParent = layer.getVisibleParent(marker);
    isInCluster = !!(markerParent as any)._spiderLeg;
  }
  const content = await createPopUpContent(point, isInCluster);
  const { createRoot } = await import("react-dom/client");
  const root = createRoot(popupContainer!);
  root.render(
    <LeafletPopupContent
      popUp={content}
      coordinates={{
        lat: point.coordinates[0],
        lng: point.coordinates[1],
      }}
      isInCluster={isInCluster}
      view={view}
      marker={marker}
      clusterMarkers={clusterMarkers}
    />
  );
  return popupContainer;
};

const createPopUpContent = async (point: mapPOIData, isInCluster?: boolean) => {
  const popUp = await fetchPopUpData(point.o);
  return popUp;
};

export const popUpZoomIn = (
  view: L.Map,
  coordinates: { lat: number; lng: number },
  marker?: L.Marker
) => {
  marker ? marker.closePopup() : view.closePopup();
  const zoomLevel =
    view.getZoom() < view.getMaxZoom() - 2
      ? view.getZoom() + 3
      : view.getMaxZoom();
  view.flyTo(new L.LatLng(coordinates.lat, coordinates.lng), zoomLevel);
};

export const navigateCluster = (
  marker: L.Marker,
  direction: number,
  activeClusterMarkersRef: any
) => {
  const currentMarkerIndex = activeClusterMarkersRef.current.findIndex(
    (m: L.Marker<any>) => m === marker
  );

  const nextMarkerIndex =
    (currentMarkerIndex + direction + activeClusterMarkersRef.current.length) %
    activeClusterMarkersRef.current.length;

  const nextMarker = activeClusterMarkersRef.current[nextMarkerIndex];
  nextMarker.fire("click");
};
