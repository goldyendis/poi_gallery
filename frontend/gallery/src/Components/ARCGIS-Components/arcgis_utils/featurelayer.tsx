import { mapPOIData } from "../../../Types/PoiTypes";
import { renderer } from "./cluster_config";

export type InitializeFeatureLayerType = {
  _featureLayer: __esri.FeatureLayer;
  _pointGraphich: __esri.Graphic[];
};

export async function initializeFeatureLayer(
  data: mapPOIData[],
  searchParams: URLSearchParams,
  onChangeCount: (count: number) => void
): Promise<InitializeFeatureLayerType> {
  const [Graphic, Point, FeatureLayer] = await Promise.all([
    import("@arcgis/core/Graphic").then((m) => m.default),
    import("@arcgis/core/geometry/Point").then((m) => m.default),
    import("@arcgis/core/layers/FeatureLayer").then((m) => m.default),
  ]);

  const pointGraphic = data.map(
    (poi) =>
      new Graphic({
        geometry: new Point({
          latitude: poi.coordinates[0],
          longitude: poi.coordinates[1],
        }),
        attributes: {
          objectid: poi.o,
          poitype: poi.poitype.toString(),
          // poitype_alias: poi.poitype_alias,
        },
      })
  );

  const _featureLayer = new FeatureLayer({
    renderer,
    source: pointGraphic,
    objectIdField: "id",
    minScale: 2500000,
    outFields: ["*"],
    fields: [
      { name: "id", type: "oid" },
      { name: "objectid", type: "string" },
      { name: "poitype", type: "string" },
      // { name: "poitype_alias", type: "string" },
    ],
  });

  await _featureLayer.load();
  if (searchParams.size === 0) {
    const result = await _featureLayer.queryFeatureCount();
    onChangeCount!(result);
    return {
      _featureLayer,
      _pointGraphich: pointGraphic,
    };
  } else {
    const getMapGraphichModule = await import("./mapgraphich");
    const graphichs = await getMapGraphichModule.getMapGraphich(
      searchParams,
      pointGraphic
    );
    await _featureLayer.applyEdits({
      deleteFeatures: graphichs.delete,
    });
    const result = await _featureLayer.queryFeatureCount();
    onChangeCount!(result);

    return {
      _featureLayer,
      _pointGraphich: pointGraphic,
    };
  }
}
