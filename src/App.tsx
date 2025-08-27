import { Layout } from "antd";
import "./App.css";
import Sidebar from "./shared/layouts/sidebar/Sidebar";
import { Content } from "antd/es/layout/layout";
import TopMenu from "./shared/layouts/TopMenu/TopMenu";

function App() {
  return (
    <Layout style={{ minHeight: "100vh", padding: 0 }}>
      <TopMenu />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
