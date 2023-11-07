import POIDetailsList from "./POIDetailsList";
import POIImageSlide from "./POIImageSlide";
import POIMap from "./POIMap";
import axios from "axios";
import { parsePOI } from "../utils/poi_data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { POI } from "../Types/PoiTypes";
import { backendURL } from "../utils/urls_development";
import Spinner from "./Spinner";
import styles from "./POIPage.module.css";

const fetchPOI = async (id: string): Promise<POI> => {
  const url = backendURL + `/poi/${id}/`;
  const response = await axios.get(url);
  const parsedData: POI = parsePOI(response);
  return parsedData;
};

function POIPage() {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: [`poi/${id}`],
    queryFn: () => fetchPOI(id!),
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (data !== undefined) {
    return (
      <div className={styles.myContainer}>
        <div style={{ flex: "1" }}>
          <POIImageSlide images_list={data?.images_list} />
          <div style={{ flex: "1" }}>
            <POIMap {...data} />
            <POIDetailsList {...data} />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>ERROR</h1>;
  }
}

export default POIPage;
