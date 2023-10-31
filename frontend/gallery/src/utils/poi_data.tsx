import { POIData, POI } from "../Types/PoiTypes";
import { AxiosResponse } from "axios";

export function parsePOIData(response: AxiosResponse<any, any>): POIData {
  const POIList: POIData = {
    meta: {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    },
    result: [...response.data.results],
  };
  return POIList;
}
export function parsePOI(response: AxiosResponse<any, any>) {
  const Poi: POI = { ...response.data };
  return Poi;
}
