import { Space, Table, Divider, Button, Tooltip } from "antd";
import { PlusOutlined, DeleteFilled, EditFilled  } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { TeacherEntity } from "../types";
import { TeacherService } from "../services/TeacherService";
export default function Teacher() {
  const [data, setData] = useState<TeacherEntity[]>([]);

    const renderActions = (value: any, record: TeacherEntity, index: number) => {
    return (
      <Space>
        <Tooltip placement="topLeft" title="Επεξεργασία">
          <Button
            type="default"
            // disabled={!record.CanEdit}
            // onClick={() => handleEdit(record)}
          >
            <EditFilled />
          </Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Διαγραφή">
          <Button
            // disabled={!record.CanDelete}
            // onClick={() => handleDelete(record)}
            danger
          >
            <DeleteFilled />
          </Button>
        </Tooltip>
      </Space>
    );
  };

  const columns: TableColumnsType<TeacherEntity> = [
    { title: 'Όνοματεπώνυμο', dataIndex: 'name', key: 'name' },
    { title: 'Συντ/φια', dataIndex: 'short', key: 'short' },
    { title: 'Ειδικότητα', dataIndex: 'specialty', key: 'specialty' },
    { title: 'Χρώμα', dataIndex: 'color', key: 'color' },
    { title: 'Συνεχόμενες Ώρες Διδασκαλίας', dataIndex: 'continuousTeachingHours', width: 150, key: 'continuousTeachingHours' },
    {
      title: 'Τροποποιήσεις',
      dataIndex: '',
      key: 'x',
      render: () => renderActions(null, null as any, 0),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await TeacherService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
      setData(response);
    };
    fetchData();
  }, []);


  return (
    <>
      <h2>Εκπαιδευτικοί</h2>
      <Divider orientation="start" orientationMargin={0}></Divider>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          // shape="round"
          size="large"
          icon={<PlusOutlined />}
          style={{ fontSize: 16, padding: "0 16px" }}
        >
          Προσθήκη
        </Button>
      </Space>
      <Table<TeacherEntity>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.availabilities.join(", ")}</p>,
        }}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}