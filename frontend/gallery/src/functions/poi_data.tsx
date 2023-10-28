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
  console.log(Poi)
  return Poi;
}

export function parseImageListToSource(images_list: string[]) {
 const list = images_list.map((image) => ({
    src: image,
    width: 3840, // Provide the appropriate width
    height: 2560, // Provide the appropriate height
 }))
  // console.log(list)
  return list
}
