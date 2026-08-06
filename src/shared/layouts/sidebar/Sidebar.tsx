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
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const sideBarMenuItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <FontAwesomeIcon icon={faHouse} />,
      label: (
        <NavLink to="/">
          Αρχική
        </NavLink>
      ),
    },
    {
      key: "school",
      icon: <FontAwesomeIcon icon={faSchool} />,
      label: (
        <NavLink to="/school">
          Σχολική Μονάδα
        </NavLink>
      )
    },
    {
      key: "teachers",
      icon: <FontAwesomeIcon icon={faChalkboardUser} />,
      label: (
        <NavLink to="/teachers">
          Εκπαιδευτικοί
        </NavLink>
      ),
    },
    {
      key: "groups",
      icon: <FontAwesomeIcon icon={faPeopleGroup} />,
      label: (
        <NavLink to="/groups">
          Τμήματα
        </NavLink>
      ),
    },
    {
      key: "teachings",
      icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
      label: (
        <NavLink to="/teachings">
          Διδασκαλίες
        </NavLink>
      ),
    },
    {
      key: "timetables",
      icon: <FontAwesomeIcon icon={faCalendarWeek} />,
      label: (
        <NavLink to="/timetables">
          Προγράμματα
        </NavLink>
      ),
    },
    {
      key: "register",
      icon: <FontAwesomeIcon icon={faCalendarWeek} />,
      label: (
        <NavLink to="/register">
          Εγγραφή
        </NavLink>
      ),
    }
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
