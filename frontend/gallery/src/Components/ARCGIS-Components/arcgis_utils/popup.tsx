import axios from "axios";
import { backendURL } from "../../../utils/constans";

export const addPopUp = async (featureLayer: __esri.FeatureLayer) => {
  const [ActionButton, PopupTemplate] = await Promise.all([
    import("@arcgis/core/support/actions/ActionButton.js").then(
      (m) => m.default
    ),
    import("@arcgis/core/PopupTemplate").then((m) => m.default),
  ]);
  const toDetailPage = new ActionButton({
    title: "Részletek",
    id: "poi-page",
    className: "esri-icon-home",
  });
  const template = new PopupTemplate({
    returnGeometry: true,
    title: poiPopUpTitle,
    content: poiPopUpContent,
    actions: [toDetailPage],
  });
  featureLayer.popupTemplate = template;
};

const poiPopUpTitle = async (mapPOI: any) => {
  const objectid: string = mapPOI.graphic.attributes.objectid;
  const response = await axios.get(backendURL + `/poi/popup-title/${objectid}`);
  return response.data.title;
};

const poiPopUpContent = async (mapPOI: any) => {
  const objectid: string = mapPOI.graphic.attributes.objectid;
  const response = await axios.get(
    backendURL + `/poi/popup-content/${objectid}`
  );
  const poiData = response.data;
  const htmlContent = `
    <div>
      <p style="margin-top: 1px; margin-bottom: 2px;">Hosszúság: ${mapPOI.graphic.geometry.longitude.toPrecision(
        8
      )}</p>
      <p style="margin-top: 0; margin-bottom: 2px;">Szélesség: ${mapPOI.graphic.geometry.latitude.toPrecision(
        8
      )}</p>
      <div >
      <a href="/poigallery/poi/${poiData.objectid}">
      <img src="${
        poiData.thumbnail
      }" style="max-width: 100%; height: auto;"/></a>
      </div>
    </div>
  `;

  return htmlContent;
};
export const addPopupTemplate = async (
  featureLayer: __esri.FeatureLayer | undefined,
  popupAdded: boolean,
  view: __esri.MapView
) => {
  if (popupAdded || !featureLayer) return;

  await addPopUp(featureLayer);
  const reactiveUtils = await import("@arcgis/core/core/reactiveUtils");
  reactiveUtils.on(
    () => view.popup,
    "trigger-action",
    (event) => {
      if (event.action.id === "poi-page") {
        navigateToDetail(view!.popup.selectedFeature);
      }
    }
  );
  return true;
};

const navigateToDetail = (mapPOI: __esri.Graphic) => {
  window.open(`/poigallery/poi/${mapPOI.attributes.objectid}`, "_blank");
};
