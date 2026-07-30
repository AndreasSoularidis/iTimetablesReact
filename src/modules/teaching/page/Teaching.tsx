import { Space, Table, Divider, Button, Tooltip } from "antd";
import { PlusOutlined, DeleteFilled, EditFilled  } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { TeachingEntity } from "../types";
import { TeachingService } from "../services/TeachingService";

export default function Teaching() {
  const [data, setData] = useState<TeachingEntity[]>([]);

  const renderActions = (value: any, record: TeachingEntity, index: number) => {
    return (
      <Space>
        <Tooltip placement="topLeft" title="Επεξεργασία">
          <Button
            type="default"
            // onClick={() => handleEdit(record)}
          >
            <EditFilled />
          </Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Διαγραφή">
          <Button
            // onClick={() => handleDelete(record)}
            danger
          >
            <DeleteFilled />
          </Button>
        </Tooltip>
      </Space>
    );
  };

  const columns: TableColumnsType<TeachingEntity> = [
    { 
        title: 'Τμήμα', 
        dataIndex: 'name',
        key: 'schoolClassName',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    { 
        title: 'Ώρες Διδασκαλίας', 
        dataIndex: 'teachingHours',
        key: 'schoolClassTeachingHours',
    },
    { 
        title: 'Ανατεθέντες Ώρες Διδασκαλίας', 
        dataIndex: 'assignedTeachingHours', 
        key: 'assignedTeachingHours',
    },
    {
      title: 'Τροποποιήσεις',
      dataIndex: '',
      key: 'x',
      render: () => renderActions(null, null as any, 0),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await TeachingService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
      console.log("Fetched teachings data in Teaching.tsx:", response);
      setData(response);
    };
    fetchData();
  }, []);


  return (
    <>
      <h2>Διδασκαλίες</h2>
      <Divider orientation="start" orientationMargin={0}></Divider>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          style={{ fontSize: 16, padding: "0 16px" }}
        >
          Προσθήκη
        </Button>
      </Space>
      <Table<TeachingEntity>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}