import { createContext, useState, ReactNode } from "react";

type MapContextProps = {
  view?: __esri.MapView;
  loadMap?: (container: HTMLDivElement) => Promise<void>;
};

export const MapContext = createContext<MapContextProps>({});
export function MapProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<__esri.MapView>();
  async function loadMap(container: HTMLDivElement) {
    if (view) return;
    const { init } = await import("../utils/arcgis_utils");
    const _view = init(container);
    _view.popup.spinnerEnabled = true;
    _view.popup.collapseEnabled = false;
    _view.ui.move(["zoom"], "top-right");
    setView(_view);
  }

  return (
    <MapContext.Provider value={{ view, loadMap }}>
      {children}
    </MapContext.Provider>
  );
}
