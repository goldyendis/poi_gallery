// import Map from "@arcgis/core/Map";
// import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
// import MapView from "@arcgis/core/views/MapView";

// interface MapApp {
//   view?: MapView;
// }

// const baseMap = new VectorTileLayer({
//   style:
//     "https://turistaterkepek.hu/portal/sharing/rest/content/items/8886b0940476436591b0bbe4f01d7185/resources/styles/root.json",
// });
// const landuse = new VectorTileLayer({
//   style:
//     "https://turistaterkepek.hu/portal/sharing/rest/content/items/82ce134380ef481c8804028681ca9b02/resources/styles/root.json",
//   title: "Landuse",
// });
// const streets = new VectorTileLayer({
//   style:
//     "https://turistaterkepek.hu/portal/sharing/rest/content/items/5484473311714db18215a19ee62c67c1/resources/styles/root.json",
//   title: "Street",
// });

// const app: MapApp = {};
// export function init(container: HTMLDivElement) {
// if (app.view) {
//   app.view.destroy();
// }

// const map = new Map({ basemap: { baseLayers: [baseMap] } });
// const map = new Map({
// basemap: { baseLayers: [landuse, streets] }
// layers: [landuse, streets],
// });
//   const view = new MapView({
//     map: map,
//     container: container,
//     zoom: 7,
//     constraints: {
//       minZoom: 7,
//       maxZoom: 19,
//     },
//   });

//   return view;
// }
