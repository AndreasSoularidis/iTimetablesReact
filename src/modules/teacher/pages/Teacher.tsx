import { Space, Table, Divider, Button, Tooltip, Drawer, Descriptions, Tag, App } from "antd";
import { PlusOutlined, DeleteFilled, EditFilled  } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { TeacherEntity } from "../types";
import { TeacherService } from "../services/TeacherService";
import AvailabilityTable from "../../../shared/AvailabilityTable/AvailabilityTable";
import AddEditTeacher from "../components/AddEditTeacher";
import type { TeacherPost } from "../types";
import { useTimetableHub } from "../../timetable/hooks/useTimetableHub";
import { toast } from "react-toastify";

export default function Teacher() {
  const { modal } = App.useApp();
  const {isProcessing} = useTimetableHub();
  const [data, setData] = useState<TeacherEntity[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherEntity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  }
  
  const onClose = () => {
    setDrawerOpen(false);
  }

  const handleEdit = (teacher: TeacherEntity) => {
    if(isProcessing){
      toast.error("Δεν μπορείτε να επεξεργαστείτε εκπαιδευτικούς ενώ η δημιουργία του ωρολογίου βρίσκεται σε εξέλιξη.");
      return; 
    }
    setSelectedTeacher(teacher);
    setModalOpen(true);
  }

  const handleDelete = async (teacher: TeacherEntity) => {
    if(isProcessing){
      toast.error("Δεν μπορείτε να διαγράψετε εκπαιδευτικούς ενώ η δημιουργία του ωρολογίου βρίσκεται σε εξέλιξη.");
      return; 
    }
    modal.confirm({
      title: "Επιβεβαίωση Διαγραφής",
      content: "Είστε σίγουροι ότι θέλετε να διαγράψετε τον εκπαιδευτικό;",
      onOk: async () => {
        try {
          await TeacherService.delete(teacher);
          setReload((prev) => !prev);
        } catch (error) {
          console.error("Error deleting teacher:", error);
        }
      },
    });
  }


  const handleSubmit = async (teacher: TeacherPost) => {
    try{
      if(selectedTeacher){
        const teacherToUpdate = { ...teacher, id: selectedTeacher.key };
        console.log("Updating teacher:", teacherToUpdate);
        await TeacherService.update(teacherToUpdate);
      }else{
        await TeacherService.insert(teacher);
      }
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error submitting teacher:", error);
    }
    setModalOpen(false);
    setSelectedTeacher(null);
  };

  const renderActions = (value: any, record: TeacherEntity, index: number) => {
    return (
      <Space>
        <Tooltip placement="topLeft" title="Επεξεργασία">
          <Button
            type="default"
            onClick={(e) => {e.stopPropagation(); handleEdit(record); }}
          >
            <EditFilled />
          </Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Διαγραφή">
          <Button
             onClick={(e) => { e.stopPropagation(); handleDelete(record); }}
            danger
          >
            <DeleteFilled />
          </Button>
        </Tooltip>
      </Space>
    );
  };

  const columns: TableColumnsType<TeacherEntity> = [
    { title: 'Όνοματεπώνυμο', dataIndex: 'name', key: 'name', align: 'center' },
    { title: 'Συντ/φια', dataIndex: 'short', key: 'short', align: 'center' },
    { title: 'Ειδικότητα', dataIndex: 'specialty', key: 'specialty', align: 'center' },
    { title: 'Υποχρεωτικές Ώρες Διδασκαλίας', dataIndex: 'mandatoryTeachingHours', width: 130, key: 'mandatoryTeachingHours', align: 'center' },
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
      align: 'center',
      render: (_: any, record: TeacherEntity) => renderActions(null, record, 0),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await TeacherService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
      setData(response);
    };
    fetchData();
  }, [reload]);


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
          onClick={() => {
            if (isProcessing) {
              toast.error("Δεν μπορείτε να προσθέσετε εκπαιδευτικό κατά τη δημιουργία του ωρολογίου προγράμματος.");
              return;
            }
            setModalOpen(true);
          }}
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
              <Descriptions.Item label="Υποχρεωτικές Ώρες Διδασκαλίας">
                {selectedTeacher.mandatoryTeachingHours}
              </Descriptions.Item>
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
        defaultEditValues={selectedTeacher ? selectedTeacher : undefined}
        onSubmit={handleSubmit}
      />
    </>
  );
}