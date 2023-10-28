import { Layout } from "antd";
import "./maincontent.css";

import { Row } from "antd";
import axios from "axios";
import { POI, POIData } from "../Types/PoiTypes";
import { parsePOIData } from "../functions/poi_data";
import POIItemCard from "./POIItemCard";
import { useQueryClient, useQuery } from "@tanstack/react-query";
const { Content } = Layout;

const fetchInitialPOIData = async () => {
  const url = "http://127.0.0.1:8000/surveypoi/poi/";
  const response = await axios.get(url);
  const parsedData: POIData = parsePOIData(response);
  return parsedData;
};

export default function MainContent() {
  const { isLoading, data } = useQuery({
    queryKey: ["poi/"],
    queryFn: fetchInitialPOIData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Content className="content">
        <Row>
          {data?.result.map((poi: POI, index: number) => {
            return <POIItemCard poi={poi} key={poi.objectid} />;
          })}
        </Row>
      </Content>
    </>
  );
}
