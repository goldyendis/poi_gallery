import axios, { AxiosResponse } from "axios";
import { backendURL } from "./constans";
import { POICategories, POIType } from "../Types/PoiTypes";

export const fetchFilterValues = async () => {
  const response = await axios.get(backendURL + "/filter/");
  const parsedData: FilterData = parseFilterData(response);
  return parsedData;
};

export const isCategoryChecked = (
  categoryNumber: number,
  selectedFilters: number[]
) => {
  return selectedFilters.some(
    (filter) => Math.floor(filter / 100) === categoryNumber / 100
  );
};

export const isTypeChecked = (typeNum: number, selectedFilters: number[]) => {
  return selectedFilters.some((filter) => filter === typeNum);
};

export class FilterData {
  categories: POICategories[];
  types: POIType[];
  constructor(categories: POICategories[], types: POIType[]) {
    this.categories = categories;
    this.types = types;
  }
}

export function getTypesInCategory(
  data: FilterData,
  categoryNumber: number
): number[] {
  const poitypesSame = data.types.filter(
    (poitype) => poitype.catNum === categoryNumber
  );
  let typeNumbers: number[] = [];
  poitypesSame.map((poitype) => typeNumbers.push(poitype.typeNum));
  return typeNumbers;
}

function parseFilterData(response: AxiosResponse<any, any>) {
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
