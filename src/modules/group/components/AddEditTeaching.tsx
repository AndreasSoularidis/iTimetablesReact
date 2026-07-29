import {
  Button,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import type { GroupEntity, GroupPost, LookUp } from "../types";
import { toast } from "react-toastify";
import axios from "axios";
import { TeacherService } from "../../teacher/services/TeacherService";
import type { TeacherEntity } from "../../teacher/types";

const SCHOOL_UNIT_ID = "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  schoolClass: GroupEntity | undefined;
  onSubmit: (group: GroupPost) => Promise<void>;
}

export default function AddEditTeaching({
  isModalOpen,
  modifyIsModalOpen,
  schoolClass,
  onSubmit,
}: IProps) 
{
  const [teachers, setTeachers] = useState<TeacherEntity[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [grades, setGrades] = useState<LookUp[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
  };

  const handleOk = async () => {
    form.validateFields()
    .then(async (values) => {
      const dataToSubmit: GroupPost = {
        name: values.name,
        totalHours: values.totalHours,
        short: values.name,
        color: values.color,
        gradeId: selectedGrade,
        schoolUnitId: SCHOOL_UNIT_ID,
      };
      await onSubmit(dataToSubmit);
      form.resetFields();
      modifyIsModalOpen(false);
    })
    .catch(() => {
      toast.error("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
    });
  };

  const matchGrade = (gradeCode: string) => {
    const grade = grades.find(g => g.id === gradeCode);
    setSelectedGrade(grade ? grade.id : "");
    return grade ? grade.description : "";
  }

  useEffect(() => {
    if(schoolClass) {
        form.setFieldsValue({
            name: schoolClass.name,
            totalHours: schoolClass.totalHours,
            grade: matchGrade(schoolClass.grade.id),
            color: schoolClass.color,
        });

        (async () => {
          const loadedTeachers = await TeacherService.load(schoolClass.schoolUnitId);
          setTeachers(loadedTeachers);
        })();
    }

    async function fetchGrades() {
      try {
        const response = await axios.get("http://localhost:5191/api/schoolgrades");
        const data  = response.data.schoolGrades
        .sort((a: { id: string; description: string, schoolTypeId: string }, b: { id: string; description: string, schoolTypeId: string }) =>
              a.description.localeCompare(b.description));;
        setGrades(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }
    fetchGrades();
    
  }, [schoolClass, form, isModalOpen]);

  return (
    <Modal
      title={schoolClass ? "Επεξεργασία Τμήματος" : "Προσθήκη Τμήματος"}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      width={650}
    >
      <Descriptions column={1} bordered size="small" style={{ label: { width: 160 } }}>
        <Descriptions.Item label="Τάξη">{schoolClass?.grade.description}</Descriptions.Item>
        <Descriptions.Item label="Τμήμα">{schoolClass?.name}</Descriptions.Item>
        <Descriptions.Item label="Υποχρεωτικές Ώρες Διδασκαλίας">{schoolClass?.totalHours}</Descriptions.Item>
        <Descriptions.Item label="Υπολειπόμενες Ώρες Διδασκαλίας">0</Descriptions.Item>
      </Descriptions>  
      <Form form={form} layout="vertical" >
        <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
            name="teacher"
            label="Εκπαιδευτικός"
            rules={[{ required: true, message: "Παρακαλώ επιλέξτε εκπαιδευτικό!" }]}
            style={{ display: "inline-block", width: "calc(75% - 8px)", marginRight: 16 }}
            >
                <Select
                options={teachers.map((teacher) => ({
                    key: teacher.key,
                    value: teacher.key,
                    label: teacher.name,
                }))}
                placeholder="Επιλέξτε εκπαιδευτικό"
                onChange={(value) => {
                    form.setFieldsValue({ teacher: value });
                    setSelectedTeacher(value);
                }}
                />
            </Form.Item>
            <Form.Item
            name="teacherReamingHours"
            label="Υπολειπόμενες Ώρες"
            style={{ display: "inline-block", width: "calc(25% - 8px)" }}
            >
                <Input disabled />
            </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
            name="course"
            label="Μάθημα"
            rules={[{ required: true, message: "Παρακαλώ επιλέξτε μάθημα!" }]}
            style={{ display: "inline-block", width: "calc(75% - 8px)", marginRight: 16 }}
            >
                <Select
                options={grades.map((grade) => ({
                    key: grade.id,
                    value: grade.id,
                    label: grade.description,
                }))}
                placeholder="Επιλέξτε μάθημα"
                onChange={(value) => {
                    form.setFieldsValue({ course: value });
                    setSelectedCourse(value);
                }}
                />
            </Form.Item>
            <Form.Item
                name="totalHours"
                label="Ώρες Διδασκαλίας"
                rules={[{ required: true, message: "Παρακαλώ εισάγετε το σύνολο ωρών διδασκαλίας!" }]}
                style={{ display: "inline-block", width: "calc(25% - 8px)" }}
            >
                <InputNumber min={1} max={35} />
            </Form.Item>
        </Form.Item>
        </Form>
        <Flex justify="flex-end" style={{ marginTop: 8 }}>
            <Button type="primary" size="middle" style={{ backgroundColor: "green" }}>Προσθήκη Διδασκαλίας</Button>
        </Flex>
        <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Διδασκαλίες</Divider>
            <Table
              size="small"
              pagination={false}
            //   dataSource={selectedTeacher.teachings.map((t, i) => ({ ...t, key: i }))}
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
    </Modal>
  );
}