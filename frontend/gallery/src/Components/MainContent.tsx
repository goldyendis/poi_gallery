import { Layout } from "antd";
import "./maincontent.css";

import { Col, Row } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { POI, POIData } from "../Types/PoiTypes";
import { parsePOIData } from "../functions/poi_data";
import POIItemCard from "./POIItemCard";
import { useState } from "react";
const { Content } = Layout;

const fetchInitialPOIData = async () => {
  const url = "http://127.0.0.1:8000/poi/";
  const response = await axios.get(url);
  const parsedData: POIData = parsePOIData(response);
  return parsedData;
};

export default function MainContent() {
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useQuery("poilist-default", fetchInitialPOIData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <Content className="content">
      <Row>
        {data?.result.map((poi: POI, index: number) => {
          return (
            <POIItemCard poi={poi} key={poi.objectid} callback={setOpen} />
          );
        })}
      </Row>
    </Content>
  );
}
