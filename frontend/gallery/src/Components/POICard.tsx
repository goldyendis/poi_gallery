import { Card, Col } from "antd";
import { POI } from "../Types/PoiTypes";
import { Link } from "react-router-dom";
import "./maincontent.css";

type POICardProps = {
  poi: POI;
};

function POICard({ poi }: POICardProps) {
  return (
    <Col xs={12} sm={8} md={6} lg={4} xl={3}>
      <Link to={`/poi/${poi.objectid}`}>
        <Card
          className="small-card"
          hoverable
          cover={
            <img className="card-image" src={poi.thumbnail} loading="lazy" />
          }
        >
          <div className="card-text">
            <h4>{poi.poicat_alias}</h4>
            <h6>{poi.poitype_alias}</h6>
          </div>
        </Card>
      </Link>
    </Col>
  );
}

export default POICard;
