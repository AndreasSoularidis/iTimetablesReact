import {
  faCalendarWeek,
  faChalkboardUser,
  faHouse,
  faPeopleGroup,
  faPersonChalkboard,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";

export default function Sidebar() {
  const sideBarMenuItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <FontAwesomeIcon icon={faHouse} />,
      label: "Αρχική",
    },
    {
      key: "school",
      icon: <FontAwesomeIcon icon={faSchool} />,
      label: "Σχολική Μονάδα",
    },
    {
      key: "groups",
      icon: <FontAwesomeIcon icon={faPeopleGroup} />,
      label: "Τμήματα",
    },
    {
      key: "teachers",
      icon: <FontAwesomeIcon icon={faChalkboardUser} />,
      label: "Εκπαιδευτικοί",
    },
    {
      key: "teachings",
      icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
      label: "Διδασκαλίες",
    },
    {
      key: "timetables",
      icon: <FontAwesomeIcon icon={faCalendarWeek} />,
      label: "Προγράμματα",
    },
  ];
  return (
    <Sider width={230}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={["home"]}
        style={{ height: "100%", fontSize: "1rem", borderRight: 0 }}
        items={sideBarMenuItems}
      />
    </Sider>
  );
}
