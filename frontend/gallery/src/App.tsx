import React, { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { POIData } from "./Types/PoiTypes";
import { parsePOIData } from "./functions/poi_data";
import MyHeader from "./Components/MyHeader";
import Sidebar from "./Components/Sidebar";
import { Layout } from "antd";
import MainContent from "./Components/MainContent";
const { Sider, Header, Content } = Layout;

const queryClient = new QueryClient();

function App() {
  // const [poiList, setPoiList] = useState<POIData>();

  // useEffect(() => {
  //   const poiData = async () => {
  //     const url = "http://127.0.0.1:8000/poi/";
  //     var parsedData: POIData;
  //     fetch(url)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`Request failed with status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((response) => {
  //         parsedData = parsePOIData(response);
  //         setPoiList(parsedData);
  //       })
  //       .catch((error) => {
  //         console.error(`Error: ${error.message}`);
  //       });
  //   };
  //   console.log(poiList);
  //   poiData();
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MyHeader />
        <Layout>
          <Sidebar />
          <MainContent />
        </Layout>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
