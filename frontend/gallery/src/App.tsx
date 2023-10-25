import React, { useEffect, useState } from "react";
import "./App.css";
import { POIData } from "./Types/PoiTypes";
import { parsePOIData } from "./functions/poi_data";
import NavBar from "./Components/NavBar";

function App() {
  const [poiList, setPoiList] = useState<POIData>();

  useEffect(() => {
    const poiData = async () => {
      const url = "http://127.0.0.1:8000/poi/";
      var parsedData: POIData;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          parsedData = parsePOIData(response);
          setPoiList(parsedData);
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
        });
    };
    poiData();
  }, []);
  return (
    <>
      <NavBar />
      {/* <SideBar/> */}
      {poiList && <h1>{poiList.meta.count}</h1>}
      {poiList && <h1>{poiList.meta.next}</h1>}
      {/* <Main/> */}
    </>
  );
}

export default App;
