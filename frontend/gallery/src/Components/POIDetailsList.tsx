import { POI } from "../Types/PoiTypes";

export default function POIDetailsList(poi: POI) {
  return (
    <div
      style={{
        width: "33%",
        height: "40vh",
        position: "absolute",
        bottom: "0",
        right: "0",
        margin: "10px",
        backgroundColor: "lightgray",
        padding: "5px",
        overflowWrap: "break-word",
      }}
    >
      <p>{poi.notes}</p>
      <p>{poi.poicat_alias}</p>
      <p>{poi.poitype_alias}</p>
      <p>{poi.shape}</p>
      <p>{poi.poiname}</p>
      <p>{poi.surveydate}</p>
      <p>{poi.coordinates.x}</p>
      <p>{poi.coordinates.y}</p>
    </div>
  );
}
