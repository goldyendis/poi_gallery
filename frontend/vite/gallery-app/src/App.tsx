import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ClusterToggleProvider } from "./context/ClusterToogleContext";
import { FeatureCountProvider } from "./context/FeatureCountContext";
import { LeafletMapProvider } from "./context/LeafletMapViewContext";
import OverlaySpinner from "./Components/OverlaySpinner";

export const queryClient = new QueryClient();
const POIPage = lazy(() => import("./Components/POIPage"));
const Home = lazy(() => import("./Components/Home"));

function App() {
  return (
    <Suspense fallback={<OverlaySpinner />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ClusterToggleProvider>
            <LeafletMapProvider>
              <FeatureCountProvider>
                <Routes>
                  <Route path="poigallery/" element={<Home isMap={false} />} />
                  <Route
                    path="poigallery/map/"
                    element={<Home isMap={true} />}
                  />
                  <Route path="poigallery/poi/:id" element={<POIPage />} />
                </Routes>
              </FeatureCountProvider>
            </LeafletMapProvider>
          </ClusterToggleProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
