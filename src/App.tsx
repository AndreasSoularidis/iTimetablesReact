import { Layout, App as AntApp } from "antd";
import "./App.css";
import Sidebar from "./shared/layouts/sidebar/Sidebar";
import { Content } from "antd/es/layout/layout";
import TopMenu from "./shared/layouts/TopMenu/TopMenu";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { TimetableHubProvider } from "./modules/timetable/hooks/useTimetableHub";

function App() {
  return (
    <AntApp>
      <TimetableHubProvider>
        <Layout style={{ minHeight: "100vh", padding: 0 }}>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <TopMenu />
          <Layout>
            <Sidebar />
            <Layout style={{ padding: "0 24px 24px" }}>
              <Content>
                <AppRoutes />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </TimetableHubProvider>
    </AntApp>
  );
}

export default App;
