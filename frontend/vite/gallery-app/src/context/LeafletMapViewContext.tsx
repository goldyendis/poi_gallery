import { createContext, useState, ReactNode } from "react";
import L from "leaflet";
// import { init } from "../Leaflet/leatlef_esri_vector";

type MapContextProps = {
  view?: L.Map | null;
  loadMap?: (container: HTMLDivElement) => Promise<void>;
};

export const LeafletMapContext = createContext<MapContextProps>({});
export function LeafletMapProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<L.Map | null>();
  async function loadMap(container: HTMLDivElement) {
    if (view) return;
    const { init } = await import("../Leaflet/leaflet_utils");
    const _view = init(container);
    setView(_view);
  }

  return (
    <LeafletMapContext.Provider value={{ view, loadMap }}>
      {children}
    </LeafletMapContext.Provider>
  );
}
