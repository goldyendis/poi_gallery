import axios from "axios";
import { POIData, mapPOIData, popUp } from "../Types/PoiTypes";
import {
  parseMapSearchIDs,
  parsePOIData,
  parsePOIMapData,
  parsePopUpData,
} from "./poi_data";
import { backendURL } from "./constans";

export const mergeFilterAndOtherSearchParams = (
  filterParams: URLSearchParams,
  otherParams: URLSearchParams
) => {
  const params: string[] = filterParams.getAll("poitype");
  const uniqueArray = [...new Set(params)];
  otherParams.set("poitype", uniqueArray.join(","));
  return otherParams;
};

export const updateSearchParams = (searchParams: URLSearchParams) => {
  let queryString = "";
  for (const entry of searchParams.entries()) {
    const params: string = entry[1];
    if (params.length === 0) continue;
    const paramArray: string[] = params.split(",");
    const uniqueArray = [...new Set(paramArray)];
    queryString += `${entry[0]}=${uniqueArray.join(",")}&`;
  }
  queryString = queryString.slice(0, -1);
  if (queryString.charAt(-1) === ",") queryString = queryString.slice(0, -1);
  return queryString;
};

export const fetchMapSearchID = async (url?: string) => {
  const response = await axios.get(backendURL + "/map/?" + url);
  const parsedMapSearchIDs: string[] = parseMapSearchIDs(response);
  return parsedMapSearchIDs;
};

export const fetchPopUpData = async (id: number) => {
  const response = await axios.get(backendURL + `/poi/popup/${id}/`);
  const parsedPopUp: popUp = parsePopUpData(response);
  return parsedPopUp;
};

export const fetchMapData = async (url?: string) => {
  let callUrl;
  if (url === "") {
    callUrl = backendURL + "/map/";
  } else {
    callUrl = backendURL + "/map/?" + url;
  }
  const response = await axios.get(callUrl);
  const parsedMapData: mapPOIData[] = parsePOIMapData(response);
  return parsedMapData;
};

export const fetchPOIList = async (url?: string) => {
  let callUrl;
  if (url === "") {
    callUrl = backendURL + "/poi/";
  } else {
    callUrl = backendURL + "/poi/?" + url;
  }

  const response = await axios.get(callUrl);
  const parsedData: POIData = parsePOIData(response);
  return parsedData;
};

export const createQueryParam = (selectedFilters: number[]) => {
  const searchParam = new URLSearchParams();
  const selectedTypesString: string[] = selectedFilters.map((number) => {
    return number.toString();
  });
  const uniqueArray = [...new Set(selectedTypesString)];
  searchParam.append("poitype", uniqueArray.join(","));
  return searchParam;
};
export { backendURL };
