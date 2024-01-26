import { Suspense, lazy, useEffect, useState } from "react";
import OverlaySpinner from "./OverlaySpinner";

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
      // document.documentElement.scrollTop = 0;
      if (!mapRendered) setMapRendered(true);
    }
  }, [isMap]);

  return (
    <>
      <MyHeader />
      <Suspense fallback={<OverlaySpinner />}>
        {mapRendered && <LeafletMap active={isMap} />}
        <MainContent active={!isMap} />
      </Suspense>
    </>
  );
}
