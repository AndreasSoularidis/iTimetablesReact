import { Space, Table, Divider, Button, Tooltip, Tag } from "antd";
import { PlusOutlined, DeleteFilled, EditFilled  } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { TeachingEntity } from "../types";
import { TeachingService } from "../services/TeachingService";

export default function Teaching() {
  const [data, setData] = useState<TeachingEntity[]>([]);
  const [filters, setFilters] = useState<{ text: string; value: string }[]>([]);

  const renderActions = (value: any, record: TeachingEntity, index: number) => {
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

  const columns: TableColumnsType<TeachingEntity> = [
    { 
        title: 'Όνοματεπώνυμο', 
        dataIndex: 'name', 
        key: 'name',
        filters: filters,
        sorter: (a, b) => a.name.localeCompare(b.name),
        onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    },
    { 
        title: 'Τμήμα', 
        dataIndex: 'schoolClass', 
        key: 'schoolClass',
        sorter: (a, b) => a.schoolClass.localeCompare(b.schoolClass),
    },
    { 
        title: 'Μάθημα', 
        dataIndex: 'course', 
        key: 'course',
        sorter: (a, b) => a.course.localeCompare(b.course), 
    },
    { title: 'Ώρες Διδασκαλίας', dataIndex: 'totalHours', key: 'totalHours' },
    {
        title: 'Κατανομή',
        dataIndex: 'dispersion',
        key: 'dispersion',
        render: (dispersion: number[]) => (
        <Space wrap>
            {dispersion.slice(1).map((h, i) => <Tag key={i} color="blue">{h}ω</Tag>)}
        </Space>
        ),
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
      setData(response);
      const newFilters = [...new Map(response.map((record) => [record.name, { text: record.name, value: record.name }])).values()];
      setFilters(newFilters);
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