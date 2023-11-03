import { Layout } from "antd";
import MainContent from "./MainContent";
import MyHeader from "./MyHeader";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <Layout>
      <MyHeader />
      <Layout>
        <Sidebar />
        <Layout>
          <MainContent />
        </Layout>
      </Layout>
    </Layout>
  );
}
