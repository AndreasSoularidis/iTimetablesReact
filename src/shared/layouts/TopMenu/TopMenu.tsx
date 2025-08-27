import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, type MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";

export default function TopMenu() {
  const navBarItems: MenuProps["items"] = [
    {
      key: "user",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="demo-logo">iTimetables</div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={navBarItems}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flex: 8,
          minWidth: 0,
        }}
      />
    </Header>
  );
}
