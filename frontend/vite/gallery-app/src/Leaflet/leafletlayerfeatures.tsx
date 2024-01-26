import { mapPOIData } from "../Types/PoiTypes";
import {
  fetchMapSearchID,
  updateSearchParams,
} from "../utils/urls_development";

export const getMapFeatures = async (
  searchParams: URLSearchParams,
  allPOI: mapPOIData[],
  prevSearchParams: URLSearchParams = new URLSearchParams()
): Promise<mapPOIData[]> => {
  let markers: mapPOIData[] = [];
  if (searchParams.get("search")) {
    const queryString = updateSearchParams(searchParams);
    const IDs: string[] = await fetchMapSearchID(queryString);
    markers = allPOI.filter((poi: mapPOIData) => {
      return IDs.includes(poi.o.toString());
    });
    return markers;
  } else if (prevSearchParams.get("search")) {
    const currentTypes = searchParams.getAll("poitype")[0]?.split(",") || [];
    if (currentTypes.length === 0) {
      markers = allPOI;
      return markers;
    } else {
      markers = allPOI.filter((poi) =>
        currentTypes.includes(poi.poitype.toString())
      );
    }
    return markers;
  } else {
    const currentTypes = searchParams.get("poitype")
      ? searchParams.getAll("poitype")[0].split(",")
      : [];
    if (currentTypes.length === 0) {
      return allPOI;
    } else {
      markers = allPOI.filter((poi) =>
        currentTypes.includes(poi.poitype.toString())
      );
    }
    return markers;
  }
};
