import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import POIPage from "./Components/POIPage";
import Home from "./Components/Home";
import MyConfigProvider from "./ConfigProvider";

const queryClient = new QueryClient();

function App() {
  return (
    // <MyConfigProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/poi/" element={<Home />} />
          <Route path="/poi/:id" element={<POIPage />} />
        </Routes>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" /> */}
    </QueryClientProvider>
    // </MyConfigProvider>
  );
}

export default App;
