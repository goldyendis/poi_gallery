import { ClusterToggleProvider } from "../context/ClusterToogleContext";
import { FeatureCountProvider } from "../context/FeatureCountContext";
import { lazy, useEffect, useState } from "react";
import { LeafletMapProvider } from "../context/LeafletMapViewContext";

type HomeProp = {
  isMap: boolean;
};
const MainContent = lazy(() => import("./MainContent"));
const LeafletMap = lazy(() => import("../Leaflet/LeafletMap"));
const MyHeader = lazy(() => import("./Header-Components/MyHeader"));

export default function Home({ isMap }: HomeProp) {
  const [mapRendered, setMapRendered] = useState(false);
  useEffect(() => {
    if (isMap) {
      document.documentElement.scrollTop = 0;
      if (!mapRendered) setMapRendered(true);
    }
  }, [isMap]);

  return (
    <ClusterToggleProvider>
      <LeafletMapProvider>
        <FeatureCountProvider>
          <MyHeader />
          {mapRendered && <LeafletMap active={isMap} />}
          <MainContent active={!isMap} />
        </FeatureCountProvider>
      </LeafletMapProvider>
    </ClusterToggleProvider>
  );
}
