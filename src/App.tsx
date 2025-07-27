import React from 'react';
import { CalendarOutlined, LaptopOutlined, NotificationOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons/faSchool';
import { faCalendarWeek, faChalkboardUser, faHouse, faPeopleGroup, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons';

const { Header, Content, Sider } = Layout;


const navBarItems: MenuProps['items'] = [
  {
    key: "user",
    icon: <FontAwesomeIcon icon={faUser} />
  }
]

const sideBarMenuItems: MenuProps['items'] = [
  {
    key: "home",
    icon: <FontAwesomeIcon icon={faHouse} />,
    label: "Αρχική"
  },
  {
    key: "school",
    icon: <FontAwesomeIcon icon={faSchool} />,
    label: "Σχολική Μονάδα"
  },
  {
    key: "groups",
    icon: <FontAwesomeIcon icon={faPeopleGroup}/>,
    label: "Τμήματα"
  },
  {
    key: "teachers",
    icon: <FontAwesomeIcon icon={faChalkboardUser}/>,
    label: "Εκπαιδευτικοί"
  },
  {
    key: "teachings",
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
    label: "Διδασκαλίες"
  },
  {
    key: "timetables",
    icon: <FontAwesomeIcon icon={faCalendarWeek} />,
    label: "Προγράμματα"
  },

]


function App() {
  return (
    <Layout style={{minHeight: "100vh", padding: 0}}>
      <Header style={{ display: 'flex', justifyContent:"space-between", alignItems: 'center' }}>
        <div className="demo-logo">iTimetables</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={navBarItems}
          style={{ display: "flex", justifyContent:"flex-end", flex: 8, minWidth: 0, }}
        />
      </Header>
      <Layout>
        <Sider width={230}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['home']}
            style={{ height: '100%', fontSize: "1rem",  borderRight: 0 }}
            items={sideBarMenuItems}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
