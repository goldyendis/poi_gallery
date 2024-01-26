import {
  fetchMapSearchID,
  updateSearchParams,
} from "../../../utils/urls_development";

export type getMapGraphichType = {
  add?: __esri.Graphic[];
  delete?: __esri.Graphic[];
};

export const getMapGraphich = async (
  searchParams: URLSearchParams,
  allGraphic: __esri.Graphic[],
  prevSearchParams: URLSearchParams = new URLSearchParams()
): Promise<getMapGraphichType> => {
  let graphichEdits: getMapGraphichType = {};
  if (searchParams.get("search")) {
    const queryString = updateSearchParams(searchParams);
    const IDs: string[] = await fetchMapSearchID(queryString);
    graphichEdits.add = allGraphic.filter((graphic: __esri.Graphic) => {
      return IDs.includes(graphic.attributes.objectid.toString());
    });
    graphichEdits.delete = allGraphic;
    return graphichEdits;
  } else if (prevSearchParams.get("search")) {
    const currentTypes = searchParams.getAll("poitype")[0]?.split(",") || [];
    if (currentTypes.length === 0) {
      graphichEdits.add = allGraphic;
    } else {
      graphichEdits.add = allGraphic.filter((graphic) =>
        currentTypes.includes(graphic.attributes.poitype.toString())
      );
    }
    graphichEdits.delete = allGraphic;
    return graphichEdits;
  } else {
    const currentTypes = searchParams.get("poitype")
      ? searchParams.getAll("poitype")[0].split(",")
      : [];
    const prevTypes = prevSearchParams.get("poitype")
      ? prevSearchParams.getAll("poitype")[0].split(",")
      : [];
    if (prevTypes.length === 0) {
      graphichEdits.delete = allGraphic.filter(
        (graphic) =>
          !currentTypes.includes(graphic.attributes.poitype.toString())
      );
    } else if (currentTypes.length === 0) {
      graphichEdits.add = allGraphic.filter(
        (graphic) => !prevTypes.includes(graphic.attributes.poitype.toString())
      );
    } else {
      const typesToAdd = currentTypes.filter(
        (type) => !prevTypes.includes(type)
      );

      const typesToDelete = prevTypes.filter(
        (type) => !currentTypes.includes(type)
      );

      graphichEdits.add = allGraphic.filter((graphic) =>
        typesToAdd.includes(graphic.attributes.poitype.toString())
      );
      graphichEdits.delete = allGraphic.filter((graphic) =>
        typesToDelete.includes(graphic.attributes.poitype.toString())
      );
    }

    return graphichEdits;
  }
};
