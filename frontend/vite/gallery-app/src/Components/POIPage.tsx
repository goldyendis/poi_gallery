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
  if (data) {
    return (
      <div className={styles.myContainer}>
        <POIImageSlide images_list={data?.images_list} />
        <div>
          <POIMap lat={data.coordinates.lat} lon={data.coordinates.lon} />
          <POIDetailsList {...data} />
        </div>
      </div>
    );
  } else {
    return <h1>A kért POI nem található!</h1>;
  }
}

export default POIPage;
