import { useEffect, useState } from "react";
import { ProfileService } from "../services/ProfileService";
import { Descriptions, Divider, Space, Button, type DescriptionsProps } from "antd";
import type { DirectorResponse, DirectorUpdateRequest } from "../types";
import { EditOutlined } from "@ant-design/icons";
import EditUserProfile from "../components/EditUserProfile";

export default function Profile() {
  const [profileData, setProfileData] = useState<DescriptionsProps['items']>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DirectorResponse | null>(null);
  const [reload, setReload] = useState(false);

  const handleEdit = (record: DirectorResponse) => {
    setIsModalOpen(true);
    setData(record);
  }

  const handleDelete = async (record: DirectorResponse) => {
    await ProfileService.delete(record.id);
    setReload((prev) => !prev);
  }

  const handleSubmit = async (userProfile: DirectorUpdateRequest) => {
    await ProfileService.update(userProfile);
    setReload((prev) => !prev);
    setIsModalOpen(false);
  };

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
      setData(directorData);
    };
    fetchDirector();
  }, [reload]);

  return (
    <>
      <h2>Στοιχεία Προφίλ</h2>
      <Divider orientation="start" orientationMargin={0}></Divider>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ fontSize: 16, textAlign: "center", padding: "0 16px", height: 40 }}
          onClick={() => handleEdit(data!)}
        >
          Επεξεργασία
        </Button>
        <Button
          type="primary"
          danger
          icon={<EditOutlined />}
          style={{ fontSize: 16, textAlign: "center", padding: "0 16px", height: 40 }}
        onClick={() => handleDelete(data!)}
        >
          Διαγραφή
        </Button>
      </Space>
      <Descriptions column={1} bordered size="small" style={{ width: 770 }} items={profileData} />
      <EditUserProfile
        isModalOpen={isModalOpen}
        modifyIsModalOpen={setIsModalOpen}
        defaultEditValues={data}
        onSubmit={handleSubmit}
      />
    </>
  );
}