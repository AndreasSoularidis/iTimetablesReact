import { Space, Table, Divider, Drawer, Descriptions, Tag, Row, Col, Card, Button } from "antd";
import { PlusOutlined, PlusCircleOutlined, EyeFilled } from "@ant-design/icons";
import AddEditTeaching from "../components/AddEditTeaching";
import { useEffect, useState } from "react";
import type { TeachingEntity } from "../types";
import { TeachingService } from "../services/TeachingService";
import { useTimetableHub } from "../../timetable/hooks/useTimetableHub";
import { toast } from "react-toastify";


export default function Teaching() {
  const [data, setData] = useState<TeachingEntity[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeaching, setSelectedTeaching] = useState<TeachingEntity | null>(null);
  const {isProcessing} = useTimetableHub();

  const handleTeachingSubmit = () => {
    setIsModalOpen(false);
    setSelectedTeaching(null);
    setReloadData(true);
  };

  const handleOpenModal = (teaching: TeachingEntity | null) => {
    if(isProcessing) {
      toast.error("Δεν μπορείτε να τροποποιήσετε τις διδασκαλίες ενώ η δημιουργία του ωρολογίου βρίσκεται σε εξέλιξη.");
      return;
    }
    setSelectedTeaching(teaching);
    setIsModalOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await TeachingService.load();
      setData(response);
    };
    fetchData();
    setReloadData(false);
  }, [reloadData]);

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
            onClick={() => handleOpenModal(null)}
        >
            Προσθήκη
        </Button>
    </Space>
      <Row gutter={[16, 16]}>
        {data.map((group) => {
          const actions: React.ReactNode[] = [
              <EyeFilled key="show" onClick={() => { setDrawerOpen(true); setSelectedTeaching(group); }} />,
              <PlusCircleOutlined key="addTeaching" onClick={() => handleOpenModal(group)} />
          ];
          
          return (
          <Col key={group.key} span={8}>
              <Card title={`Τμήμα ${group.name}`} 
                  actions={actions} 
                  type="inner" 
                  >
                  <p>Ώρες Διδασκαλίας: {group.teachingHours}</p>
                  <p>Ανατεθέντες Ώρες Διδασκαλίας: {group.assignedTeachingHours}</p>
              </Card>
          </Col>
          );
        })}
      </Row>
      <Drawer
        title="Διδασκαλίες"
        size="large"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {selectedTeaching && (
          <>
            <Descriptions column={1} bordered size="small" style={{ label: { width: 160 } }}>
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
      <AddEditTeaching
          isModalOpen={isModalOpen}
          modifyIsModalOpen={setIsModalOpen}
          defaultValues={selectedTeaching!}
          onSubmit={handleTeachingSubmit}
        />
    </>
  );
}           