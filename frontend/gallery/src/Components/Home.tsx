import { Layout } from "antd";
import MainContent from "./MainContent";
import MyHeader from "./MyHeader";
import Sidebar from "./Sidebar";
import MyPagination from "./Pagination";

export default function Home() {
  return (
    <Layout>
      <MyHeader />
      <Layout>
        <Sidebar />
        <Layout>
          <MyPagination />
          <MainContent />
        </Layout>
      </Layout>
    </Layout>
  );
}
