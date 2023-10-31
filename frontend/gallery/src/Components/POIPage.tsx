import POIDetailsList from "./POIDetailsList";
import POIImageSlide from "./POIImageSlide";
import POIMap from "./POIMap";
import axios from "axios";
import { parsePOI } from "../utils/poi_data";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { POI } from "../Types/PoiTypes";
import { backendURL } from "../utils/urls_development";

const fetchPOI = async (id: string): Promise<POI> => {
  const url = backendURL + `/poi/${id}/`;
  const response = await axios.get(url);
  const parsedData: POI = parsePOI(response);
  return parsedData;
};

function POIPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: [`poi/${id}`],
    queryFn: () => fetchPOI(id!),
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  if (data !== undefined) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <POIImageSlide images_list={data?.images_list} />
        <POIMap {...data} />
        <POIDetailsList {...data} />
      </div>
    );
  } else {
    return <h1>ERROR</h1>;
  }
}

export default POIPage;
