import { POIData, POI, mapPOIData, popUp } from "../Types/PoiTypes";
import { AxiosResponse } from "axios";

export function parseMapSearchIDs(response: AxiosResponse<any, any>): string[] {
  const ids: string[] = response.data.map((data: { [x: string]: any }) =>
    data["objectid"].toString()
  );
  return ids;
}

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

export function parsePOIMapData(
  response: AxiosResponse<any, any>
): mapPOIData[] {
  const POIMapDataList: mapPOIData[] = response.data.map((mapPoi: any) => {
    return {
      o: mapPoi[0],
      poitype: mapPoi[3],
      coordinates: [mapPoi[1], mapPoi[2]],
    };
  });

  return POIMapDataList;
}

export function parsePOI(response: AxiosResponse<any, any>) {
  const Poi: POI = { ...response.data };
  return Poi;
}

export function parsePopUpData(response: AxiosResponse<any, any>) {
  const popUp: popUp = { ...response.data };
  return popUp;
}
