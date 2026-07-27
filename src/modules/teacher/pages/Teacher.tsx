import { Space, Table, Divider, Button, Tooltip, Drawer, Descriptions, Tag } from "antd";
import { PlusOutlined, DeleteFilled, EditFilled  } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { TeacherEntity } from "../types";
import { TeacherService } from "../services/TeacherService";
import AvailabilityTable from "../../../shared/AvailabilityTable/AvailabilityTable";
import AddEditTeacher from "../components/AddEditTeacher";
import type { TeacherPost } from "../types";

export default function Teacher() {
  const [data, setData] = useState<TeacherEntity[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherEntity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  }

  const onClose = () => {
    setDrawerOpen(false);
  }

  const handleSubmit = async (teacher: TeacherPost) => {
    try{
        await TeacherService.insert(teacher);
        const response = await TeacherService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
        setData(response);
    } catch (error) {
      console.error("Error submitting teacher:", error);
    }
    setModalOpen(false);
  };

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
      title: 'Σύνολο Ωρών Διδασκαλίας',
      key: 'totalTeachingHours',
      width: 130,
      align: 'center',
      render: (_: any, record: TeacherEntity) =>
        record.teachings.reduce((sum, t) => sum + t.totalHours, 0),
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
          size="large"
          icon={<PlusOutlined />}
          style={{ fontSize: 16, padding: "0 16px" }}
          onClick={() => setModalOpen(true)}
        >
          Προσθήκη
        </Button>
      </Space>
      <Table<TeacherEntity>
        columns={columns}
       
        dataSource={data}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedTeacher(record);
            console.log("Selected Teacher:", record);
            showDrawer();
          },
          style: { cursor: "pointer" },
        })}
      />
      <Drawer
        title="Στοιχεία Εκπαιδευτικού"
        size="large"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={drawerOpen}
      >
        {selectedTeacher && (
          <>
            <Descriptions column={1} bordered size="small" styles={{ label: { width: 160 } }}>
              <Descriptions.Item label="Όνοματεπώνυμο">{selectedTeacher.name}</Descriptions.Item>
              <Descriptions.Item label="Συντ/φια">{selectedTeacher.short}</Descriptions.Item>
              <Descriptions.Item label="Ειδικότητα">{selectedTeacher.specialty}</Descriptions.Item>
              <Descriptions.Item label="Χρώμα">
                <Space>
                  <span style={{ display: 'inline-block', width: 28, height: 28, borderRadius: 6, backgroundColor: selectedTeacher.color, border: '1px solid rgba(0,0,0,0.15)', verticalAlign: 'middle' }} />
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Συνεχόμενες Ώρες">{selectedTeacher.continuousTeachingHours}</Descriptions.Item>
              <Descriptions.Item label="Σύνολο Ωρών Διδασκαλίας">
                {selectedTeacher.teachings.reduce((sum, t) => sum + t.totalHours, 0)}
              </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Διδασκαλίες</Divider>
            <Table
              size="small"
              pagination={false}
              dataSource={selectedTeacher.teachings.map((t, i) => ({ ...t, key: i }))}
              columns={[
                { title: 'Μάθημα', dataIndex: ['course', 'description'], key: 'course' },
                { title: 'Τμήμα', dataIndex: ['schoolClass', 'description'], key: 'schoolClass' },
                { title: 'Ώρες', dataIndex: 'totalHours', key: 'totalHours', width: 60, align: 'center' },
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
              ]}
            />
            <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Διαθεσιμότητες</Divider>
            <AvailabilityTable availability={Array.from({ length: 5 }, (_, i) => selectedTeacher.availabilities.slice(i * 6, i * 6 + 6))} />
          </>
        )}
      </Drawer>
      <AddEditTeacher
        isModalOpen={modalOpen}
        modifyIsModalOpen={setModalOpen}
        // defaultEditValues={selectedTeacher ?? null}
        onSubmit={handleSubmit}
      />
    </>
  );
}