import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import TopMenu from "./TopMenu/TopMenu";

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh", padding: 0 }}>
      <TopMenu />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
