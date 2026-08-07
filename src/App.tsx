import { App as AntApp } from "antd";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { TimetableHubProvider } from "./modules/timetable/hooks/useTimetableHub";

function App() {
  return (
    <AntApp>
      <TimetableHubProvider>
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
        <AppRoutes />
      </TimetableHubProvider>
    </AntApp>
  );
}

export default App;
