import "./maincontent.css";
import { Col, Layout, Row } from "antd";
import axios from "axios";
import { POI, POIData } from "../Types/PoiTypes";
import { parsePOIData } from "../utils/poi_data";
import POICard from "./POICard";
import { useQuery } from "@tanstack/react-query";
import { backendURL } from "../utils/urls_development";
import Spinner from "./Spinner";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import MyPagination from "./Pagination";
const { Content } = Layout;

const fetchPOIList = async (url?: string) => {
  console.log(backendURL + "/poi/" + url);
  const response = await axios.get(backendURL + "/poi/" + url);
  const parsedData: POIData = parsePOIData(response);
  console.log(parsedData);
  return parsedData;
};
export default function MainContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  let queryString = "?";
  for (const entry of searchParams.entries()) {
    queryString = queryString + `${entry[0]}=${entry[1]}&`;
  }

  const { isLoading, data } = useQuery({
    queryKey: [queryString],
    queryFn: () => fetchPOIList(queryString),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MyPagination count={data!.meta.count !== null ? data?.meta.count : 0} />
      <Content className="content">
        <Row gutter={[16, 16]}>
          {data?.result.map((poi: POI, index: number) => {
            return <POICard poi={poi} key={poi.objectid} />;
          })}
        </Row>
      </Content>
    </>
  );
}
