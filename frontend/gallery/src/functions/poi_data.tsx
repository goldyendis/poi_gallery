import { Dispatch, SetStateAction } from "react";
import { POIData } from "../Types/PoiTypes";

export const parsePOIData = (response: any) => {
  const POIList: POIData = {
    meta: {
      count: response.count,
      next: response.next,
      previous: response.previous,
    },
    result: [...response.results],
  };
  return POIList;
};
