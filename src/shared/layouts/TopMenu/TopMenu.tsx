import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, type MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { clearTokens } from "../../api/axiosInstance";

export default function TopMenu() {
  const firstName = sessionStorage.getItem("firstName") || "";
  const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to="/profile">
        Προφίλ
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/login" onClick={() => {
        clearTokens();
      }}>
        Αποσύνδεση
      </Link>
    ),
  }
];
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#9BD1F7",
      }}
    >
      <div className="demo-logo" style={{ color: "#000", fontSize: "1.5rem", fontWeight: "bold" }}>iTimetables</div>
      <div style={{
          display: "flex",
          justifyContent: "flex-end",
          flex: 8,
          minWidth: 0,
          backgroundColor: "#9BD1F7",
        }}>
          
        <Dropdown menu={{ items }}>
          <div>
            <span style={{ color: "#000", fontSize: "1rem", marginRight: "8px" }}>Καλώς ήρθες {firstName}</span>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
