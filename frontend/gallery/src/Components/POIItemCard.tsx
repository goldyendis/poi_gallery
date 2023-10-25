import { Card } from "antd";
import { POI } from "../Types/PoiTypes";
import axios from "axios";
import { parsePOI } from "../functions/poi_data";
import { useQuery } from "react-query";
import { useState } from "react";
import { Image } from "antd";
const { Meta } = Card;

// const fetchPOI = async (id: string) => {
//   const url = `http://127.0.0.1:8000/poi/${id}/`;
//   const response = await axios.get(url);
//   const parsedData: POI = parsePOI(response);
//   console.log(parsedData);
//   return parsedData;
// };

function POIItemCard({ poi, callback }: { poi: POI; callback: Function }) {
  //   const [open, setOpen] = useState(false);
  //   const { isLoading, data, refetch } = useQuery(
  //     "poi",
  //     () => fetchPOI(poi.objectid.toString()),
  //     {
  //       enabled: false,
  //     }
  //   );
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <Card
      className="small-card"
      hoverable
      onClick={() => callback(true)}
      cover={<img className="card-image" src={poi.thumbnail} />}
    >
      <Meta className="card-text" title={poi.poiname} />
    </Card>
  );
}

export default POIItemCard;
