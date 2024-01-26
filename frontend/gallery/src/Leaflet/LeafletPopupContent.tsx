import IconCarotLeft from "../Components/Icons/IconCaretLeft";
import IconCarotRight from "../Components/Icons/IconCarotRight";
import IconHome from "../Components/Icons/IconHome";
import Star from "../Components/Icons/Star";
import ZoomIn from "../Components/Icons/ZoomIn";

type LeafletPopupContentProps = {
  popUp: {
    objectid: number;
    thumbnail: string;
    title: string;
    rating?: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isInCluster?: boolean;
  view: L.Map;
  marker?: L.Marker;
  clusterMarkers?: any;
};

function LeafletPopupContent({
  popUp,
  coordinates,
  isInCluster,
  view,
  marker,
  clusterMarkers,
}: LeafletPopupContentProps) {
  return (
    <div>
      <h3 className="popup-title">
        <b>{popUp.title}</b>
      </h3>
      <hr className="divider" />
      <div className="popup-actions-menu">
        <div style={{ display: "flex" }}>
          <a
            style={{ paddingRight: "4px" }}
            href={`/poigallery/poi/${popUp.objectid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconHome />
          </a>
          <div
            onClick={async () => {
              const { popUpZoomIn } = await import("./leafletlayer_utils");
              popUpZoomIn(view, coordinates, marker);
            }}
            className="zoom-in-button"
            style={{ cursor: "pointer" }}
          >
            <ZoomIn />
          </div>
          <div
            onClick={() => {}}
            className="rating-button"
            style={{ cursor: "pointer", marginInlineStart: "5px" }}
          >
            <Star>
              <span className="rating-number">{popUp.rating || 0}</span>
            </Star>
          </div>
        </div>
        {isInCluster && (
          <div style={{ display: "flex" }}>
            <div
              onClick={async () => {
                const { navigateCluster } = await import(
                  "./leafletlayer_utils"
                );
                navigateCluster(marker!, -1, clusterMarkers);
              }}
              className="popup-go left"
              style={{ cursor: "pointer" }}
            >
              <IconCarotLeft />
            </div>
            <div
              onClick={async () => {
                const { navigateCluster } = await import(
                  "./leafletlayer_utils"
                );
                navigateCluster(marker!, 1, clusterMarkers);
              }}
              className="popup-go right"
              style={{ cursor: "pointer" }}
            >
              <IconCarotRight />
            </div>
          </div>
        )}
      </div>
      <hr className="divider" />
      <div className="popup-marker-data">
        <p
          style={{
            marginTop: "0px",
            marginBottom: "2px",
            marginInlineStart: "5px",
          }}
        >
          <b>Szélesség: </b>
          {coordinates.lat}
        </p>
        <p
          style={{
            marginTop: "0px",
            marginBottom: "2px",
            marginInlineStart: "5px",
          }}
        >
          <b>Hosszúság: </b> {coordinates.lng}
        </p>
        <a
          href={`/poigallery/poi/${popUp.objectid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="popup-image" src={popUp.thumbnail} />
        </a>
      </div>
    </div>
  );
}

export default LeafletPopupContent;
