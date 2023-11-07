import {
  POIData,
  POI,
  FilterData,
  POIType,
  POICategories,
} from "../Types/PoiTypes";
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

export function parseFilterData(response: AxiosResponse<any, any>) {
  const categories: POICategories[] = [];
  const types: POIType[] = [];

  for (const [cat_num, cat_alias] of Object.entries(response.data[0].poicat)) {
    const category = new POICategories(
      parseInt(cat_num, 10),
      cat_alias as string
    );
    categories.push(category);
  }

  for (const [type_num, type_alias] of Object.entries(
    response.data[0].poitype
  )) {
    const typeAsNum = parseInt(type_num, 10);
    const catNum = Math.floor(typeAsNum / 100) * 100;
    const type = new POIType(typeAsNum, type_alias as string, catNum);
    types.push(type);
  }

  const filterData: FilterData = {
    categories: categories,
    types: types,
  };
  return filterData;
}

export function getTypesInCategory(
  data: FilterData,
  categoryNumber: number
): number[] {
  const poitypesSame = data.types.filter(
    (poitype) => poitype.catNum === categoryNumber
  );
  let typeNumbers: number[] = [];
  poitypesSame.map((poitype, index) => typeNumbers.push(poitype.typeNum));
  return typeNumbers;
}
