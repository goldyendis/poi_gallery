import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

export const queryClient = new QueryClient();
const POIPage = lazy(() => import("./Components/POIPage"));
const Home = lazy(() => import("./Components/Home"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="poigallery/" element={<Home isMap={false} />} />
            <Route path="poigallery/map/" element={<Home isMap={true} />} />
            <Route path="poigallery/poi/:id" element={<POIPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
