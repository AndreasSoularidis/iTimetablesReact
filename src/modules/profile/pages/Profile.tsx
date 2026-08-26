import { useEffect, useState } from "react";
import { ProfileService } from "../services/ProfileService";
import { Descriptions, Divider, Space, Button, type DescriptionsProps } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function Profile() {
  const [profileData, setProfileData] = useState<DescriptionsProps['items']>([]);
  useEffect(() => {
    const fetchDirector = async () => {
      const directorData = await ProfileService.load();
      setProfileData(directorData ? [
        {
          label: "Όνομα",
          children: directorData.firstName,
        },
        {
          label: "Επώνυμο",
          children: directorData.lastName,
        },
        {
          label: "Όνομα Χρήστη",
          children: directorData.username,
        },
        {
          label: "Email",
          children: directorData.email,
        },
        {
          label: "Σχολική Μονάδα",
          children: directorData.schoolUnit.description,
        },
      ] : []);
    };
    fetchDirector();
  }, []);

  return (
    <div>
      <h2>Στοιχεία Προφίλ</h2>
      <Divider orientation="start" orientationMargin={0}></Divider> 
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ fontSize: 16, textAlign: "center", padding: "0 16px", height: 40 }}
          // onClick={() => handleEdit(profileData!)}
        >
          Επεξεργασία
        </Button>
        <Button
          type="primary"
          danger
          icon={<EditOutlined />}
          style={{ fontSize: 16, textAlign: "center", padding: "0 16px", height: 40 }}
          // onClick={() => handleEdit(profileData!)}
        >
          Διαγραφή
        </Button>
      </Space>
      <Descriptions column={1} bordered size="small" style={{ width: 770 }}  items={profileData} />
    </div>
  );
}