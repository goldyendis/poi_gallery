import { Card } from "antd";
import { POI } from "../Types/PoiTypes";
import { Link } from "react-router-dom";

type POICardProps = {
  poi: POI;
};

function POICard({ poi }: POICardProps) {
  return (
    <Link to={`/poi/${poi.objectid}`}>
      <Card
        className="small-card"
        hoverable
        cover={<img className="card-image" src={poi.thumbnail} />}
      >
        <div className="card-text">
          <h4>{poi.poicat_alias}</h4>
          <h6>{poi.poitype_alias}</h6>
        </div>
      </Card>
    </Link>
  );
}

export default POICard;
