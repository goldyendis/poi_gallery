import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapViewContext";
import { FeatureCountContext } from "../../context/FeatureCountContext";
import { ClusterToggleContext } from "../../context/ClusterToogleContext";
import { fetchMapData } from "../../utils/urls_development";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { InitializeFeatureLayerType } from "./arcgis_utils/featurelayer";
import { getMapGraphichType } from "./arcgis_utils/mapgraphich";

type FeatureLayerState = {
  allGraphic: __esri.Graphic[];
  featureLayer?: __esri.FeatureLayer;
};

function ArcGISFeatureLayer() {
  const { view } = useContext(MapContext);
  const { isCluster } = useContext(ClusterToggleContext);
  const [searchParams] = useSearchParams();
  const [prevSearchParams, setPrevSearchParams] = useState<URLSearchParams>();
  const [popupAdded, setPopupAdded] = useState(false);

  const [layerState, setLayerState] = useState<FeatureLayerState>({
    allGraphic: [],
    featureLayer: undefined,
  });
  const { onChangeCount } = useContext(FeatureCountContext);

  const { data } = useQuery({
    queryKey: [`map`],
    queryFn: () => {
      return fetchMapData();
    },
    staleTime: Infinity,
    networkMode: "offlineFirst",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data) return;
    if (!layerState.featureLayer) {
      import("./arcgis_utils/featurelayer").then((module) => {
        const { initializeFeatureLayer } = module;
        initializeFeatureLayer(data, searchParams, onChangeCount!).then(
          (initFl: InitializeFeatureLayerType) => {
            setLayerState({
              allGraphic: initFl._pointGraphich,
              featureLayer: initFl._featureLayer,
            });
          }
        );
      });
    } else {
      const currentSearchParamsString = searchParams.toString();
      const prevSearchParamsString = prevSearchParams?.toString();
      if (currentSearchParamsString !== prevSearchParamsString) {
        import("./arcgis_utils/mapgraphich").then((module) => {
          const { getMapGraphich } = module;
          getMapGraphich(
            searchParams,
            layerState.allGraphic,
            prevSearchParams || new URLSearchParams()
          ).then(async (graphichs: getMapGraphichType) => {
            await layerState
              .featureLayer!.applyEdits({
                deleteFeatures: graphichs.delete,
                addFeatures: graphichs.add,
              })
              .then(() => {
                return layerState.featureLayer!.queryFeatureCount();
              })
              .then((result) => {
                onChangeCount!(result);
              });
          });
        });
      }
    }
    setPrevSearchParams(new URLSearchParams(searchParams));
  }, [searchParams, data]);

  useEffect(() => {
    if (!view || !layerState.featureLayer) return;
    view.map.add(layerState.featureLayer);
    import("./arcgis_utils/cluster_config")
      .then((module) => {
        const { clusterConfig } = module;
        layerState.featureLayer!.set({
          featureReduction: isCluster ? clusterConfig : null,
        });
      })
      .then(() => {
        import("./arcgis_utils/popup").then(async (module) => {
          const { addPopupTemplate } = module;
          (await addPopupTemplate(layerState.featureLayer, popupAdded, view)) &&
            setPopupAdded(true);
        });
      });
  }, [view]);

  return <div></div>;
}
export default ArcGISFeatureLayer;
