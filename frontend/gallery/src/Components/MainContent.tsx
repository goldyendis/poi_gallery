import "./maincontent.css";

import { Layout, Row, Spin } from "antd";
import axios from "axios";
import { POI, POIData } from "../Types/PoiTypes";
import { parsePOIData } from "../utils/poi_data";
import POICard from "./POICard";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { backendURL } from "../utils/urls_development";
import MyPagination from "./Pagination";
const { Content } = Layout;

const fetchInitialPOIData = async () => {
  const url = backendURL + "/poi/";
  const response = await axios.get(url);
  const parsedData: POIData = parsePOIData(response);
  return parsedData;
};

export default function MainContent() {
  const { isLoading, data } = useQuery({
    queryKey: ["/"],
    queryFn: fetchInitialPOIData,
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

  return (
    <Content className="content">
      <Row>
        {data?.result.map((poi: POI, index: number) => {
          return <POICard poi={poi} key={poi.objectid} />;
        })}
      </Row>
    </Content>
  );
}
