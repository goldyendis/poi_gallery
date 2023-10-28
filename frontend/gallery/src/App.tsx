import "./App.css";
import MyHeader from "./Components/MyHeader";
import Sidebar from "./Components/Sidebar";
import { Layout } from "antd";
import MainContent from "./Components/MainContent";

function App() {
  return (
    <Layout>
      <MyHeader />
      <Layout>
        <Sidebar />
        <MainContent />
      </Layout>
    </Layout>
  );
}

export default App;
