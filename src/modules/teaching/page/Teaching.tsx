import { Space, Table, Divider, Button, Tooltip, Drawer, Descriptions, Tag } from "antd";
import { PlusOutlined, DeleteFilled, EditFilled  } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { TeachingEntity } from "../types";
import { TeachingService } from "../services/TeachingService";

export default function Teaching() {
  const [data, setData] = useState<TeachingEntity[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTeaching, setSelectedTeaching] = useState<TeachingEntity | null>(null);

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
        onRow={(record) => ({
          onClick: () => {
            setSelectedTeaching(record);
            setDrawerOpen(true);
          },
          style: { cursor: "pointer" },
        })}
      />
      <Drawer
        title="Διδασκαλίες"
        size="large"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {selectedTeaching && (
          <>
            <Descriptions column={1} bordered size="small" styles={{ label: { width: 160 } }}>
              <Descriptions.Item label="Τμήμα">{selectedTeaching.name}</Descriptions.Item>
              <Descriptions.Item label="Υποχρεωτικές Ώρες Διδασκαλίας">{selectedTeaching.teachingHours}</Descriptions.Item>
              <Descriptions.Item label="Δηλωμένες Ώρες Διδασκαλίας">{selectedTeaching.assignedTeachingHours}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Διδασκαλίες</Divider>
            <Table
              size="small"
              pagination={false}
              dataSource={selectedTeaching.teachings && selectedTeaching.teachings.map((t, i) => ({ ...t, key: i }))}
              columns={[
                { title: 'Μάθημα', dataIndex: ['course', 'description'], key: 'course' },
                { title: 'Εκπαιδευτικός', dataIndex: ['teacher', 'description'], key: 'teacher' },
                { title: 'Ώρες', dataIndex: 'totalHours', key: 'totalHours', width: 60, align: 'center' },
                {
                  title: 'Κατανομή',
                  dataIndex: 'dispersion',
                  key: 'dispersion',
                  render: (dispersion: number[]) => (
                    <Space wrap>
                      {dispersion.slice(1, 3).map((h, i) => <Tag key={i} color="blue">{h}ω</Tag>)}
                    </Space>
                  ),
                },
              ]}
            />
          </>
        )}
      </Drawer>
    </>
  );
}